import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Org Test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('É possivel registrar uma organização?', async () => {
    const response = await request(app.server).post('/org/register').send({
      address: 'Estrada do Java, 720',
      city: 'Rio de Janeiro',
      email: 'test@gmail.com',
      name: 'Java Pet',
      number: 2198075124,
      password: '123456',
      zip_code: 22548741,
    })

    // console.log(response.body)

    expect(response.statusCode).toEqual(201)
  })
})
