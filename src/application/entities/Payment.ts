export class Payment {
  name: string;
  cvv: string;
  cardNumber: string;
  expirationDate: { month: number; year: number };
  status?: string;

  constructor(
    name: string,
    cvv: string,
    cardNumber: string,
    expirationDate: { month: number; year: number },
    status?: string,
  ) {
    this.name = name;
    this.cvv = cvv;
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
    this.status = status;
  }
}
