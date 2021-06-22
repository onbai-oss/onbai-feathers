import app from '../../src/app';

describe('\'quiz\' service', () => {
  it('registered the service', () => {
    const service = app.service('quiz');
    expect(service).toBeTruthy();
  });
});
