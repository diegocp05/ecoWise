const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:city', async (req, res) => {
    const { city } = req.params;
    const cityName = city.toLowerCase();

    try {
        // 1. Buscar dados de clima (temperatura, coordenadas)
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
        const { coord, main } = weatherResponse.data;

        // 2. Buscar dados de qualidade do ar usando as coordenadas
        const airQualityResponse = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${coord.lat}&lon=${coord.lon}&key=${process.env.IQAIR_API_KEY}`);
        const { current } = airQualityResponse.data.data;

        // 3. Salvar/Atualizar cidade no banco de dados (lógica de histórico)
        await prisma.searchedCity.upsert({
            where: { name: cityName },
            update: { count: { increment: 1 } },
            create: { name: cityName },
        });

        // 4. Montar a resposta final
        const responseData = {
            temperature: main.temp,
            cityName,
            aqi: current.pollution.aqius,
            mainPollutant: current.pollution.mainus,
            coordinates: coord,
        };
        console.log(city);
        res.json(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar dados da cidade. Verifique o nome e tente novamente." });
    }
});

// Rota para pegar o Top 5 cidades pesquisadas
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

module.exports = router;