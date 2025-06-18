import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/translate', async (req, res) => {
  const { text, from, to } = req.query;
  if (!text || !from || !to) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error en la traducción' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy de traducción escuchando en http://localhost:${PORT}`);
});