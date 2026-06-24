const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.PIPEDRIVE_API_KEY;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Pipedrive Proxy rodando', apiKey: API_KEY ? 'configurada' : 'AUSENTE' });
});

app.all('/api/*', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'PIPEDRIVE_API_KEY não configurada no Railway' });
  }
  const path = req.params[0];
  const queryParams = new URLSearchParams(req.query);
  queryParams.set('api_token', API_KEY);
  const url = `https://api.pipedrive.com/v1/${path}?${queryParams.toString()}`;
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Pipedrive Proxy rodando na porta ${PORT}`);
});
