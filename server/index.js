require('dotenv').config(); // Chame apenas uma vez no topo
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CONFIGURAÇÃO DO CORS (Deve vir ANTES das rotas) ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://eco-wise-j2ob6s3vs-diegos-projects-9360246e.vercel.app', // Mantendo URLs antigas por segurança
  'https://eco-wise-h28r6jtfb-diegos-projects-9360246e.vercel.app'  // A URL do erro atual
  // Adicione a URL de produção final quando a tiver
  // 'https://ecowise.vercel.app' 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`[CORS Error] Origem não permitida: ${origin}`); // Log mais claro
      callback(new Error(`Origem ${origin} não permitida por CORS`));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions)); // Aplica as opções de CORS UMA VEZ AQUI
// ----------------------------------------------------

// Middleware para parsear JSON (UMA VEZ AQUI)
app.use(express.json());

// Rota de Boas-Vindas
app.get('/', (req, res) => {
  res.send('EcoWise API está funcionando!');
});

// Rota principal para os dados ambientais (DEPOIS do CORS e JSON)
app.use('/api/weather', weatherRoutes);

// Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});