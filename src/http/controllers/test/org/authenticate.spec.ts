import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('org Test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('É possivel fazer login e receber um token de authenticação?', async () => {
    await request(app.server).post('/org/register').send({
      address: 'Estrada do Java, 720',
      city: 'Rio de Janeiro',
      email: 'test@gmail.com',
      name: 'Java Pet',
      number: 2198075124,
      password: '123456',
      zip_code: 22548741,
    })

    const response = await request(app.server).post('/org').send({
      email: 'test@gmail.com',
      password: '123456',
    })

    // console.log(response)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
