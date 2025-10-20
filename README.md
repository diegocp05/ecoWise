<div align="center">

EcoWise - Dashboard de Consciência Ambiental

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/github/stars/diegocp05/ecowise%3Fstyle%3Dfor-the-badge" />
<img src="https://www.google.com/search?q=https://img.shields.io/github/forks/diegocp05/ecowise%3Fstyle%3Dfor-the-badge" />
<img src="https://www.google.com/search?q=https://img.shields.io/github/license/diegocp05/ecowise%3Fstyle%3Dfor-the-badge" />
</p>

<p align="center">
Uma aplicação web moderna e interativa que analisa a saúde ambiental de cidades ao redor do mundo. Utilizando múltiplas APIs e um algoritmo <strong>EcoScore</strong> exclusivo, o EcoWise traduz dados complexos de poluição e clima em uma pontuação clara e acionável, promovendo a consciência ecológica.
</p>

<h1 align="center">
<img height="400" alt="Planeta Terra girando com pontos de dados" title="Planeta Terra" src="https://www.google.com/search?q=https://media1.tenor.com/m/V20-1h_a_yAAAAAd/world-earth.gif"/>
</h1>
</div>

🌟 Funcionalidades

📊 Dados em Tempo Real: Busca instantânea de dados climáticos e de poluição para qualquer cidade do mundo.

💯 EcoScore Inteligente: Um algoritmo exclusivo que analisa AQI, poluentes industriais e clima para gerar uma pontuação de 0 a 100.

🗺️ Mapa Interativo: Visualização geográfica da cidade pesquisada com marcadores dinâmicos via Leaflet.

📈 Visualização de Dados: Gráficos e painéis intuitivos (Recharts) que apresentam métricas complexas de forma simples e visual.

⚖️ Ferramenta de Comparação: Compare as métricas ambientais de duas cidades lado a lado para obter insights diretos.

🏆 Rankings Dinâmicos: Listas atualizadas em tempo real das cidades mais pesquisadas e daquelas com o melhor EcoScore.

📡 URL Base da API

# A API está hospedada no Railway (substitua pela sua URL)
[https://ecowise-backend-production.up.railway.app](https://ecowise-backend-production.up.railway.app)


📋 Rotas da API

Obter Dados Ambientais de uma Cidade

GET /api/weather/:city


Retorna um objeto completo com dados climáticos, de poluição e o EcoScore para a cidade especificada.

Exemplo de Uso:

fetch("[https://ecowise-backend-production.up.railway.app/api/weather/Serrana](https://ecowise-backend-production.up.railway.app/api/weather/Serrana)")
    .then(response => response.json())
    .then(data => console.log(data));


Listar Cidades Mais Buscadas

GET /api/weather/stats/top-cities


Retorna um array com as 5 cidades mais pesquisadas.

Listar Cidades com Melhor EcoScore

GET /api/weather/stats/greenest-cities


Retorna um array com as 5 cidades com o maior EcoScore.

📄 Formato da Resposta (/api/weather/:city)

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


Configure e inicie o Backend

cd server
npm install

# Crie um arquivo .env e adicione suas chaves de API e URL do banco
# Exemplo no arquivo .env.example

npx prisma migrate dev
npm run dev


Configure e inicie o Frontend (em um novo terminal)

# Na raiz do projeto (ecowise)
npm install

# Crie um arquivo .env.local e adicione a URL do backend
NEXT_PUBLIC_API_URL="http://localhost:3001"

npm run dev


A aplicação estará disponível em http://localhost:3000

📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🚀 Autor

<img height="100" src="https://avatars.githubusercontent.com/u/80592413?v=4">
<sub>@diegocp05</sub>

<p align="center">
Feito com ❤️ por <a href="https://github.com/diegocp05">Diego Costa</a>
</p>
