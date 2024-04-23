import { ProcessPayment } from './processPayment';
import { Payment } from '../entities/Payment';
import {
  errorMessage,
  invalidCardMessage,
  insufficientFundsMessage,
  expiredCardMessage,
  successPaymentMessage,
} from '../constants/paymentMessages';

function expectPaymentRejection(payment, expectedError) {
  return expect(ProcessPayment.execute(payment)).rejects.toThrow(expectedError);
}

function expectPaymentAcceptance(payment) {
  return expect(ProcessPayment.execute(payment)).resolves.toEqual(successPaymentMessage);
}

describe('UseCases: ProcessPayment', () => {
  describe('Successful Cases', () => {
    it('should resolve with "Payment accepted" when all parameters are valid', async () => {
      const validPayment = new Payment('John Doe', '123', '1234567890123456', {
        month: 12,
        year: 2028,
      });

      await expectPaymentAcceptance(validPayment);
    });
  });

  describe('Failure Cases', () => {
    it('should reject with an error when "name" parameter is missing or invalid', async () => {
      const invalidPayment = new Payment('', '123', '1234567890123456', { month: 12, year: 2023 });

      await expectPaymentRejection(invalidPayment, errorMessage);
    });

    it('should reject with an error when "cvv" parameter is missing or invalid', async () => {
      const invalidPayment = new Payment('John Doe', '', '1234567890123456', {
        month: 12,
        year: 2023,
      });

      await expectPaymentRejection(invalidPayment, errorMessage);
    });

    it('should reject with an error when "cardNumber" parameter is missing or invalid', async () => {
      const invalidPayment = new Payment('John Doe', '123', '', { month: 12, year: 2023 });

      await expectPaymentRejection(invalidPayment, errorMessage);
    });

    it('should reject with an error when "expirationDate" parameter is missing or invalid', async () => {
      const invalidPayment = new Payment('John Doe', '123', '1234567890123456', {
        month: NaN,
        year: NaN,
      });

      await expectPaymentRejection(invalidPayment, errorMessage);
    });

    it('should reject with an error when the card number is invalid', async () => {
      const invalidPayment = new Payment('John Doe', '123', '1111111111111111', {
        month: 12,
        year: 2023,
      });

      await expectPaymentRejection(invalidPayment, invalidCardMessage);
    });

    it('should reject with an error when the card number has insufficient funds', async () => {
      const invalidPayment = new Payment('John Doe', '123', '1234123412341234', {
        month: 12,
        year: 2023,
      });

      await expectPaymentRejection(invalidPayment, insufficientFundsMessage);
    });

    it('should reject with an error when the card is expired', async () => {
      const expiredPayment = new Payment('John Doe', '123', '1234567890123456', {
        month: 4,
        year: 2022,
      });

      await expectPaymentRejection(expiredPayment, expiredCardMessage);
    });
  });
});
