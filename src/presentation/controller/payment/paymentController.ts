import { Request, Response } from 'express';
import { Payment } from '../../../application/entities/Payment';
import { ProcessPayment } from '../../../application/useCases/processPayment';
import { errorMessage } from '../../../application/constants/paymentMessages';

const paymentController = {
  async processPayment(req: Request, res: Response): Promise<void> {
    const { name, cvv, cardNumber, expirationDate } = req.body;

    try {
      if (!name || !cvv || !cardNumber || !expirationDate) {
        throw new Error(errorMessage);
      }

      const payment = new Payment(name, cvv, cardNumber, expirationDate);

      const result = await ProcessPayment.execute(payment);
      res.json({ message: result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default paymentController;
