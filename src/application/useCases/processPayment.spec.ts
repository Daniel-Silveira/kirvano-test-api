import { ProcessPayment } from './processPayment';
import { Payment } from '../entities/Payment';
import {
  errorMessage,
  invalidCardMessage,
  insufficientFundsMessage,
  expiredCardMessage,
  successPaymentMessage,
} from '../constants/paymentMessages';

describe('ProcessPayment', () => {
  it('should reject with an error when "name" parameter is missing or invalid', async () => {
    const invalidPayment = new Payment('', '123', '1234567890123456', { month: 12, year: 2023 });

    await expect(ProcessPayment.execute(invalidPayment)).rejects.toThrow(errorMessage);
  });

  it('should reject with an error when "cvv" parameter is missing or invalid', async () => {
    const invalidPayment = new Payment('John Doe', '', '1234567890123456', {
      month: 12,
      year: 2023,
    });

    await expect(ProcessPayment.execute(invalidPayment)).rejects.toThrow(errorMessage);
  });

  it('should reject with an error when "cardNumber" parameter is missing or invalid', async () => {
    const invalidPayment = new Payment('John Doe', '123', '', { month: 12, year: 2023 });

    await expect(ProcessPayment.execute(invalidPayment)).rejects.toThrow(errorMessage);
  });

  it('should reject with an error when "expirationDate" parameter is missing or invalid', async () => {
    const invalidPayment = new Payment('John Doe', '123', '1234567890123456', {
      month: NaN,
      year: NaN,
    });

    await expect(ProcessPayment.execute(invalidPayment)).rejects.toThrow(errorMessage);
  });

  it('should reject with an error when the card number is invalid', async () => {
    const invalidPayment = new Payment('John Doe', '123', '1111111111111111', {
      month: 12,
      year: 2023,
    });

    await expect(ProcessPayment.execute(invalidPayment)).rejects.toThrow(invalidCardMessage);
  });

  it('should reject with an error when the card number has insufficient funds', async () => {
    const invalidPayment = new Payment('John Doe', '123', '1234123412341234', {
      month: 12,
      year: 2023,
    });

    await expect(ProcessPayment.execute(invalidPayment)).rejects.toThrow(insufficientFundsMessage);
  });

  it('should reject with an error when the card is expired', async () => {
    const expiredPayment = new Payment('John Doe', '123', '1234567890123456', {
      month: 4,
      year: 2022,
    });

    await expect(ProcessPayment.execute(expiredPayment)).rejects.toThrow(expiredCardMessage);
  });

  it('should resolve with "Payment accepted" when all parameters are valid', async () => {
    const validPayment = new Payment('John Doe', '123', '1234567890123456', {
      month: 12,
      year: 2028,
    });

    await expect(ProcessPayment.execute(validPayment)).resolves.toEqual(successPaymentMessage);
  });
});
