<h1 align="center"> EcoWise - Dashboard Ambiental </h1>

<p align="center">

<img src="https://img.shields.io/github/issues/diegocp05/ecowise"/>

<img src="https://img.shields.io/github/forks/diegocp05/ecowise"/>

<img src="https://img.shields.io/github/stars/diegocp05/ecowise"/>

<img src="https://img.shields.io/github/license/diegocp05/ecowise"/>

</p>

<p align="center">Uma aplicação web moderna e interativa que analisa a saúde ambiental de cidades ao redor do mundo. Utilizando múltiplas APIs e um algoritmo <strong>EcoScore</strong> exclusivo, o EcoWise traduz dados complexos de poluição e clima em uma pontuação clara e acionável, promovendo a consciência ecológica.</p>

<h1 align="center">

  <img height="400" alt="Planeta Terra girando com pontos de dados" title="EcoWise" src="https://media1.tenor.com/m/V20-1h_a_yAAAAAd/world-earth.gif"/>

</h1>

## 🌟 Funcionalidades

### 💯 EcoScore Inteligente e Análise de Dados

- **Algoritmo Exclusivo**: Gera uma pontuação de 0 a 100 baseada em AQI, poluentes específicos (CO, NO₂, O₃) e conforto climático.

- **Métricas Detalhadas**: Exibe dados de visibilidade, umidade e velocidade do vento.

- **Transparência**: Inclui um guia explicando como o EcoScore é calculado.

### 🏆 Rankings e Comparativos

- **Cidades Mais Verdes**: Ranking dinâmico das cidades com o melhor EcoScore.

- **Cidades Mais Buscadas**: Ranking das cidades mais populares na plataforma.

- **Ferramenta de Comparação**: Analise duas cidades lado a lado com indicadores visuais.

### 🗺️ Visualização Interativa

- **Dashboard em Tempo Real**: Todos os dados são atualizados a cada nova busca.

- **Gráficos Intuitivos**: Gráfico radial (gauge) para o Índice de Qualidade do Ar (AQI) com cores dinâmicas.

- **Mapa Interativo**: Localização da cidade com marcador via Leaflet.

## 📦 URL BASE

```bash

- Substitua pela URL da sua API no Railway

[https://ecowise-backend-production.up.railway.app](https://ecowise-backend-production.up.railway.app)



## 📋 Rotas da API

🏠 Rota Principal

GET /


Retorna mensagem de boas-vindas da API.

🌍 Dados Ambientais

Obter Dados de uma Cidade

GET /api/weather/:city


Exemplo de Uso:

fetch("[https://ecowise-backend-production.up.railway.app/api/weather/Serrana](https://ecowise-backend-production.up.railway.app/api/weather/Serrana)")
    .then(response => response.json())
    .then(data => console.log(data));


📊 Rankings

Listar Cidades com Melhor EcoScore

GET /api/weather/stats/greenest-cities


Retorna um array com as 5 cidades com a maior pontuação no EcoScore.

Listar Cidades Mais Buscadas

GET /api/weather/stats/top-cities


Retorna um array com as 5 cidades mais pesquisadas pelos usuários.

📄 Formato de Resposta (/api/weather/:city)

{
  "name": "Serrana",
  "temperature": 22.5,
  "humidity": 38,
  "windSpeed": 3.0,
  "visibility": 10000,
  "aqi": 51,
  "mainPollutant": "PM2.5",
  "coordinates": {
    "lon": -47.5986,
    "lat": -21.2119
  },
  "ecoScore": 74,
  "co": 253.68,
  "no2": 1.45,
  "o3": 85.83
}


🌟 Exemplos de Uso Completos

Obter dados ambientais de uma cidade

async function obterDadosCidade(nomeCidade) {
    try {
        const apiUrl = '[https://ecowise-backend-production.up.railway.app](https://ecowise-backend-production.up.railway.app)';
        const response = await fetch(`${apiUrl}/api/weather/${encodeURIComponent(nomeCidade)}`);
        const data = await response.json();
        
        console.log(`Dados para ${data.name}:`);
        console.log(`- EcoScore: ${data.ecoScore}`);
        console.log(`- AQI: ${data.aqi}`);
        
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da cidade:', error);
    }
}

// Uso
obterDadosCidade('Curitiba');


Obter o ranking de cidades mais verdes

async function obterRankingEcoScore() {
    try {
        const apiUrl = '[https://ecowise-backend-production.up.railway.app](https://ecowise-backend-production.up.railway.app)';
        const response = await fetch(`${apiUrl}/api/weather/stats/greenest-cities`);
        const ranking = await response.json();
        
        console.log('Ranking EcoScore:', ranking);
        return ranking;
    } catch (error) {
        console.error('Erro ao buscar o ranking:', error);
    }
}

// Uso
obterRankingEcoScore();


🔧 Tecnologias Utilizadas

Frontend: Next.js + React + TypeScript

Backend: Node.js + Express

Banco de Dados: PostgreSQL + Prisma ORM

Estilização: Tailwind CSS

Visualização: Recharts & React-Leaflet

Deploy: Vercel (Frontend) & Railway (Backend + DB)

📚 Como Executar Localmente

Clone o repositório

git clone [https://github.com/diegocp05/ecowise.git](https://github.com/diegocp05/ecowise.git)
cd ecowise


Instale as dependências e configure o Backend

cd server
npm install
# Crie um arquivo .env e adicione suas variáveis de ambiente
# (veja .env.example)
npx prisma migrate dev


Instale as dependências e configure o Frontend

cd ..
npm install
# Crie um arquivo .env.local e adicione a URL da sua API
# NEXT_PUBLIC_API_URL="http://localhost:3001"


Inicie os servidores

# Em um terminal, dentro de /server
npm run dev

# Em outro terminal, na raiz do projeto (ecowise)
npm run dev


A aplicação estará disponível em http://localhost:3000

📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🚀 Autor

<img height="100" src="https://avatars.githubusercontent.com/u/111817757?v=4"> <sub>@diegocp05</sub>

<p align="center">
  Feito com ❤️ por <a href="https://github.com/diegocp05">Diego Costa</a>
</p>
