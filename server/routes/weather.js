const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// 1. Adicione o mapa de poluentes para tradução
const POLLUTANT_MAP = {
  p1: 'PM10',
  p2: 'PM2.5',
  o3: 'Ozônio',
  n2: 'Dióxido de Nitrogênio',
  s2: 'Dióxido de Enxofre',
  co: 'Monóxido de Carbono',
};

const calculateEcoScoreV4 = (data) => {
  // --- 1. Pontuação da Qualidade do Ar Geral (AQI) - Escala Suavizada ---
  // Mapeia as faixas oficiais de AQI para uma pontuação mais justa.
  let aqiScore;
  if (data.aqi <= 50) { // Bom
    aqiScore = 100 - (data.aqi / 50) * 10; // Faixa 90-100
  } else if (data.aqi <= 100) { // Moderado
    aqiScore = 90 - ((data.aqi - 50) / 50) * 20; // Faixa 70-90
  } else if (data.aqi <= 150) { // Insalubre p/ Grupos Sensíveis
    aqiScore = 70 - ((data.aqi - 100) / 50) * 20; // Faixa 50-70
  } else { // Insalubre ou pior
    aqiScore = Math.max(0, 50 - ((data.aqi - 150) / 150) * 50); // Faixa 0-50
  }

  // --- 2. Pontuação dos Poluentes Específicos - Média Ponderada com Penalidade ---
  // Limites mais realistas para dados em tempo real.
  const coScore = Math.max(0, 100 - (data.co / 9000) * 100);   // Limite saudável alto: 9000 µg/m³
  const no2Score = Math.max(0, 100 - (data.no2 / 80) * 100);  // Limite de atenção: 80 µg/m³
  const o3Score = Math.max(0, 100 - (data.o3 / 180) * 100);   // Limite de atenção: 180 µg/m³
  
  // Média ponderada dos poluentes. NO₂ e O₃ são mais relevantes para smog urbano.
  const pollutantWeights = { no2: 0.45, o3: 0.45, co: 0.10 };
  let pollutantScore = (no2Score * pollutantWeights.no2) + (o3Score * pollutantWeights.o3) + (coScore * pollutantWeights.co);

  // PENALIDADE DE SEGURANÇA: Se qualquer poluente estiver ruim (score < 60), ele puxa a média para baixo.
  const lowestPollutantScore = Math.min(coScore, no2Score, o3Score);
  if (lowestPollutantScore < 60) {
    pollutantScore = (pollutantScore + lowestPollutantScore) / 2;
  }

  // --- 3. Pontuação de Conforto Climático - Penalidade Suave ---
  // Ideal é 22°C. Penaliza 1.5 pontos para cada grau de desvio.
  const climateScore = Math.max(0, 100 - Math.abs(data.temperature - 22) * 1.5);

  // --- 4. Média Ponderada Final ---
  const finalWeights = {
    aqi: 0.35,
    pollutants: 0.55,
    climate: 0.10,
  };

  const finalScore = 
    (aqiScore * finalWeights.aqi) + 
    (pollutantScore * finalWeights.pollutants) + 
    (climateScore * finalWeights.climate);

  return Math.max(0, Math.round(finalScore));
};

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  const cityName = city.toLowerCase();

  try {
    // CHAMADA 1: Dados de clima
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    const { coord, main, wind, visibility, name: foundCityName } = weatherResponse.data;

    // CHAMADA 2: Dados de qualidade do ar da IQAir
    const airQualityResponse = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${coord.lat}&lon=${coord.lon}&key=${process.env.IQAIR_API_KEY}`);
    const { current } = airQualityResponse.data.data;

    // !! NOVA CHAMADA 3: Dados detalhados de poluição da OpenWeatherMap !!
    const pollutionResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.OPENWEATHER_API_KEY}`);
    const { co, no2, o3 } = pollutionResponse.data.list[0].components;

    const mainPollutantName = POLLUTANT_MAP[current.pollution.mainus] || current.pollution.mainus;

    // Coleta todos os dados necessários para o cálculo
   const calculationData = {
      aqi: current.pollution.aqius,
      temperature: main.temp,
      co: co,
      no2: no2,
      o3: o3,
    };

    // Use a nova função de cálculo
    const ecoScore = calculateEcoScoreV4(calculationData);

    // ... (lógica do Prisma para salvar o novo ecoScore continua a mesma)
    await prisma.searchedCity.upsert({
        where: { name: cityName },
        update: { count: { increment: 1 }, ecoScore: ecoScore },
        create: { name: cityName, ecoScore: ecoScore },
    });

    // Monta a resposta final
    const responseData = {
      name: foundCityName,
      temperature: main.temp,
      humidity: main.humidity,
      windSpeed: wind.speed,
      visibility: visibility, 
      aqi: current.pollution.aqius,
      mainPollutant: mainPollutantName,
      coordinates: coord,
      ecoScore: ecoScore,
      co: co,
      no2: no2,
      o3: o3,
    };
    res.json(responseData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar dados. Verifique o nome e tente novamente." });
  }
});

// Rota para pegar o Top 5 cidades mais pesquisadas
router.get('/stats/top-cities', async (req, res) => {
    try {
        const topCities = await prisma.searchedCity.findMany({
            orderBy: { count: 'desc' },
            take: 5,
        });
        res.json(topCities);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ranking." });
    }
});

// NOVA ROTA PARA O RANKING DE CIDADES VERDES
router.get('/stats/greenest-cities', async (req, res) => {
    try {
        const greenestCities = await prisma.searchedCity.findMany({
            where: { ecoScore: { not: null } },
            orderBy: { ecoScore: 'desc' },
            take: 5,
        });
        res.json(greenestCities);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ranking de cidades verdes." });
    }
});

module.exports = router;