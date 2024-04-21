import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import { AuthenticationMiddleware } from './presentation/middleware/auth';

const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 3000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? 'access_token';
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.get('/public', (_req: Request, res: Response) => {
  res.send('This is a public resource');
});

const authMiddleware = new AuthenticationMiddleware({ env: { ACCESS_TOKEN } });

app.get(
  '/private',
  (...args) => authMiddleware.handle(...args),
  (_req: Request, res: Response) => {
    res.send('This is a private resource');
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
