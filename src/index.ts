import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import { AuthenticationMiddleware } from './presentation/middleware/auth';
import { createConnection } from './data-access/db';

const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 3000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? 'access_token';

const env = {
  PORT,
  ACCESS_TOKEN,
  DB_NAME: process.env.DB_NAME ?? 'mydb',
  DB_USER: process.env.DB_USER ?? 'root',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: process.env.DB_PORT !== undefined ? Number(process.env.DB_PORT) : 3306,
};

(async () => {
  const app = express();
  const conn = await createConnection(env);

  const shutdown = (): void => {
    conn.end();
    process.exit();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

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
})().catch(console.log);
