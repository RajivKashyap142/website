import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const metricsBase = {
  calls: 6270,
  ai: 2666,
  revenue: 3.2,
  conversion: 40.1,
  answer: 73.4,
  risk: 3
};

app.get('/api/status', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    metrics: metricsBase
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.post('/api/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  const prompt = req.body?.prompt ?? '';
  const response =
    prompt.length > 0
      ? `Great question. Shrava orchestrates ${prompt.toLowerCase()} using AI-driven dialers, leadership dashboards, and full compliance controls. Shall I line up a 3-month rollout plan?`
      : 'I am online and ready to brief you on Shrava deployments, CPS scaling, compliance, and ROI intelligence.';

  const chunks = response.match(/.{1,80}/g) ?? [response];
  for (const chunk of chunks) {
    res.write(chunk);
    await new Promise((resolve) => setTimeout(resolve, 60));
  }
  res.end();
});

const distPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

app.get('*', (_req, res, next) => {
  if (!res.headersSent) {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        next();
      }
    });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Shrava backend running on http://localhost:${PORT}`);
});
