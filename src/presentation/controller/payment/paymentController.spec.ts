import { Request, Response } from 'express';
import paymentController from './paymentController';
import { Payment } from '../../../application/entities/Payment';
import { ProcessPayment } from '../../../application/useCases/processPayment';
import {
  errorMessage,
  successPaymentMessage,
} from '../../../application/constants/paymentMessages';

jest.mock('../../../application/useCases/processPayment', () => ({
  ProcessPayment: {
    execute: jest.fn(),
  },
}));

describe('PaymentController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should return a success message when all parameters are valid', async () => {
    const paymentData = {
      name: 'John Doe',
      cvv: '123',
      cardNumber: '1234567890123456',
      expirationDate: { month: 12, year: 2023 },
    };
    req.body = paymentData;

    const expectedResult = successPaymentMessage;
    (ProcessPayment.execute as jest.Mock).mockResolvedValue(expectedResult);

    await paymentController.processPayment(req as Request, res as Response);

    expect(ProcessPayment.execute).toHaveBeenCalledWith(expect.any(Payment));
    expect(res.json).toHaveBeenCalledWith({ message: expectedResult });
  });

  it('should return an error message when any parameter is missing', async () => {
    await paymentController.processPayment(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should return an error message when any parameter is empty', async () => {
    const paymentData = {
      name: '',
      cvv: '',
      cardNumber: '',
      expirationDate: { month: '', year: '' },
    };
    req.body = paymentData;

    await paymentController.processPayment(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
