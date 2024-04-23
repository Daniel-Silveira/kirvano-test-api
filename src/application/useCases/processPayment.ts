import { Payment } from '../entities/Payment';
import {
  successPaymentMessage,
  errorMessage,
  invalidCardMessage,
  insufficientFundsMessage,
  expiredCardMessage,
} from '../constants/paymentMessages';

export class ProcessPayment {
  static execute(payment: Payment): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!payment.name || typeof payment.name !== 'string') {
        return reject(new Error(errorMessage));
      }
      if (!payment.cvv || !/^\d{3}$/.test(payment.cvv)) {
        return reject(new Error(errorMessage));
      }
      if (!payment.cardNumber || !/^\d{16}$/.test(payment.cardNumber)) {
        return reject(new Error(errorMessage));
      }
      if (
        !payment.expirationDate ||
        typeof payment.expirationDate !== 'object' ||
        isNaN(payment.expirationDate.month) ||
        isNaN(payment.expirationDate.year)
      ) {
        return reject(new Error(errorMessage));
      }

      if (/^(\d)\1{15}$/.test(payment.cardNumber.replace(/\s/g, ''))) {
        return reject(new Error(invalidCardMessage));
      }
      if (payment.cardNumber.replaceAll(' ', '') === '1234123412341234') {
        return reject(new Error(insufficientFundsMessage));
      }

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if (
        payment.expirationDate.year < currentYear ||
        (payment.expirationDate.year === currentYear &&
          payment.expirationDate.month <= currentMonth)
      ) {
        return reject(new Error(expiredCardMessage));
      }

      resolve(successPaymentMessage);
    });
  }
}
