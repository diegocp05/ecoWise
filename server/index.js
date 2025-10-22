require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CONFIGURAÇÃO DO CORS ---
// Adicione a URL do seu deploy da Vercel aqui
const allowedOrigins = [
  'http://localhost:3000',
  'https://eco-wise-j2ob6s3vs-diegos-projects-9360246e.vercel.app', // A URL anterior
  'https://eco-wise-h28r6jtfb-diegos-projects-9360246e.vercel.app',// << ADICIONE ESTA LINHA
];  

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como Postman ou apps mobile) OU se a origem está na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Origem não permitida por CORS: ${origin}`); // Log do erro no backend
      callback(new Error(`Origem ${origin} não permitida por CORS`));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Se precisar enviar cookies/tokens (não essencial para este projeto)
};

app.use(cors(corsOptions)); // Aplica as opções de CORS
// ----------------------------

app.use(express.json());

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('EcoWise API está funcionando!');
});

// Rota principal para os dados ambientais
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});