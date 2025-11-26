import express, { Request, Response } from 'express';
import cors from 'cors';
import { pool } from './db';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Werewolf Server is Running!');
});

app.get('/db-test', async (req: Request, res: Response) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as time');
        client.release();
        res.json({ status: 'success', time: result.rows[0].time });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

export default app;