import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createOrgTestE2E } from '../functions/create-pet-and-org'

describe('Pet Test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('pet fearture', async () => {
    const { token } = await createOrgTestE2E(app)

    await request(app.server)
      .post('/pet/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 'CUB',
        city: 'Rio de Janeiro',
        description: '',
        habitat: 'LITTLE',
        independence: 'AVERAGE',
        name: 'toby',
      })

    const response = await request(app.server)
      .get('/pet/fearture')
      .set('Authorization', `Bearer ${token}`)
      .set('city', 'Rio de Janeiro')
      .send()

    // console.log(response.body)

    expect(response.statusCode).toEqual(201)
    expect(response.body.pets).toEqual(expect.any(Array))
  })
})
