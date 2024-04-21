import { Request, Response, NextFunction } from 'express';

export class AuthenticationMiddleware {
  private readonly env: { ACCESS_TOKEN: string };

  constructor(deps: { env: { ACCESS_TOKEN: string } }) {
    this.env = deps.env;
    this.handle = this.handle.bind(this);
  }

  handle(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization === `Bearer ${this.env.ACCESS_TOKEN}`) next();
    else return res.status(401).send('Unauthorized');
  }
}
