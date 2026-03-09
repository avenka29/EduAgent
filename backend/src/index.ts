import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRouter from './routes/course';
import textbookRouter from './routes/textbook';
import agentRouter from './routes/agent';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/course', courseRouter);
app.use('/api/textbook', textbookRouter);
app.use('/api/agent', agentRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduAgent Backend is live' });
});

app.listen(port, () => {
  console.log(`[server]: EduAgent Backend running at http://localhost:${port}`);
});
