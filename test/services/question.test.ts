import app from '../../src/app'

describe('question service', () => {
  it('registered the service', () => {
    const service = app.service('question')
    expect(service).toBeTruthy()
  })
})
