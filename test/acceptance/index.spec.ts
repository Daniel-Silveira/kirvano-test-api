import Pactum from 'pactum';

const BASE_URL = `http://localhost:${process.env.PORT}`;

describe('Authorization', () => {
  it('should return 401 UNAUTHORIZED if access token was found', async () => {
    await Pactum.spec()
      .get(`${BASE_URL}/private`)
      .withHeaders({ Authorization: '' })
      .expectStatus(401)
      .expectBody('Unauthorized');
  });

  it('should return 401 UNAUTHORIZED if access token is invalid', async () => {
    await Pactum.spec()
      .get(`${BASE_URL}/private`)
      .withHeaders({ Authorization: 'Bearer invalid' })
      .expectStatus(401)
      .expectBody('Unauthorized');
  });

  it('should allow the request to pass through if access token is valid', async () => {
    await Pactum.spec()
      .get(`${BASE_URL}/private`)
      .withHeaders({ Authorization: `Bearer ${process.env.ACCESS_TOKEN}` })
      .expectStatus(200)
      .expectBody('This is a private resource');
  });
});
