// src/data-access/db.ts

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
      if (err === null) {
        createTable(conn);
        resolve(conn);
      } else {
        reject(err);
      }
    });
  });
};

const createTable = (conn: mysql.Connection) => {
  const query = `
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      cvv VARCHAR(255) NOT NULL,
      cardNumber VARCHAR(255) NOT NULL,
      expirationDate VARCHAR(255) NOT NULL
    )
  `;

  conn.query(query, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully');
    }
  });
};
