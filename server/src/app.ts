import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { pool } from './db';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Werewolf Server is Running!');
});

app.get('/error', (req: Request, res: Response) => {
  throw new Error('Test error');
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.get('/db-test', async (req, res, next) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as time');
    client.release();
    res.json({ status: 'success', time: result.rows[0].time });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

export default app;
