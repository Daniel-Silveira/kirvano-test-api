import { Payment } from '../entities/Payment';
import {
  successPaymentMessage,
  errorMessage,
  invalidCardMessage,
  insufficientFundsMessage,
  expiredCardMessage,
} from '../constants/paymentMessages';
import { PaymentRepositoryInterface } from '../../data-access/repositories/paymentRepository';

export class ProcessPayment {
  constructor(private paymentRepository: PaymentRepositoryInterface) {}

  async execute(payment: Payment): Promise<string> {
    try {
      ProcessPayment.validatePayment(payment);
      const result = successPaymentMessage;
      await this.paymentRepository.savePayment({ ...payment, status: result });
      return result;
    } catch (error) {
      throw error;
    }
  }

  private static validatePayment(payment: Payment): void {
    this.validateName(payment.name);
    this.validateCVV(payment.cvv);
    this.validateCardNumber(payment.cardNumber);
    this.validateExpirationDate(payment.expirationDate);
  }

  private static validateName(name: string): void {
    if (!name || typeof name !== 'string') {
      throw new Error(errorMessage);
    }
  }

  private static validateCVV(cvv: string): void {
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      throw new Error(errorMessage);
    }
  }

  private static validateCardNumber(cardNumber: string): void {
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      throw new Error(errorMessage);
    }
    if (/^(\d)\1{15}$/.test(cardNumber.replace(/\s/g, ''))) {
      throw new Error(invalidCardMessage);
    }
    if (cardNumber.replaceAll(' ', '') === '1234123412341234') {
      throw new Error(insufficientFundsMessage);
    }
  }

  private static validateExpirationDate(expirationDate: { month: number; year: number }): void {
    if (
      !expirationDate ||
      typeof expirationDate !== 'object' ||
      isNaN(expirationDate.month) ||
      isNaN(expirationDate.year)
    ) {
      throw new Error(errorMessage);
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (
      expirationDate.year < currentYear ||
      (expirationDate.year === currentYear && expirationDate.month <= currentMonth)
    ) {
      throw new Error(expiredCardMessage);
    }
  }
}
