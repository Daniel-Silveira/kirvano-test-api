import mysql from 'mysql';

export const createConnection = async (env: {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
}): Promise<mysql.Connection> => {
  return await new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      port: env.DB_PORT,
    });

    conn.connect((err: mysql.MysqlError) => {
      if (err === null) resolve(conn);
      else reject(err);
    });
  });
};
