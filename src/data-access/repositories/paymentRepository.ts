import { Connection } from 'mysql';
import { Payment } from '../../application/entities/Payment';

export interface PaymentRepositoryInterface {
  savePayment(payment: Payment): Promise<boolean>;
}

export class PaymentRepository implements PaymentRepositoryInterface {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async savePayment(payment: Payment): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO payments SET ?';
      this.connection.query(query, payment, (err, results) => {
        if (err) {
          console.error('Error saving payment:', err);
          return reject(err);
        }
        resolve(results.affectedRows > 0);
      });
    });
  }
}
