require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3001;

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