import { Request, Response } from 'express';
import paymentController from './paymentController';
import { PaymentRepositoryInterface } from '../../../data-access/repositories/paymentRepository';
import { errorMessage } from '../../../application/constants/paymentMessages';

jest.mock('../../../application/useCases/processPayment', () => ({
  ProcessPayment: {
    execute: jest.fn(),
  },
}));

describe('PaymentController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let paymentRepositoryMock: PaymentRepositoryInterface;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    paymentRepositoryMock = {
      savePayment: jest.fn(),
    } as unknown as PaymentRepositoryInterface;
  });

  it('should return an error message when any parameter is missing', async () => {
    await paymentController.processPayment(req as Request, res as Response, paymentRepositoryMock);

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

    await paymentController.processPayment(req as Request, res as Response, paymentRepositoryMock);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
