export class Payment {
  name: string;
  cvv: string;
  cardNumber: string;
  expirationDate: { month: number; year: number };

  constructor(
    name: string,
    cvv: string,
    cardNumber: string,
    expirationDate: { month: number; year: number },
  ) {
    this.name = name;
    this.cvv = cvv;
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }
}
