import { Request, Response, NextFunction } from 'express';
import { AuthenticationMiddleware } from '.';

describe('AuthenticationMiddleware', () => {
  const env = { ACCESS_TOKEN: 'access_token' };

  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 UNAUTHORIZED if access token was found', async () => {
    const req = { headers: { authorization: '' } } as unknown as Request;

    const middleware = new AuthenticationMiddleware({ env });
    middleware.handle(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });

  it('should return 401 UNAUTHORIZED if access_token is not the expected one', async () => {
    const req = { headers: { authorization: 'Bearer access' } } as unknown as Request;

    const middleware = new AuthenticationMiddleware({ env });
    middleware.handle(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });

  it('should call next if access_token is the expected one', async () => {
    const req = { headers: { authorization: `Bearer ${env.ACCESS_TOKEN}` } } as unknown as Request;

    const middleware = new AuthenticationMiddleware({ env });
    middleware.handle(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
