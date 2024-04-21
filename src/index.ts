import express, { type Request, type Response } from 'express';
import helmet from 'helmet';

const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 3000;

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.get('/public', (_req: Request, res: Response) => {
  res.send('This is a public resource');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
