import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createPetTestE2E } from '../functions/create-pet-and-org'

describe('Pet Test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('pet adoptione', async () => {
    const { token, pet } = await createPetTestE2E(app)

    const response = await request(app.server)
      .post('/pet/adoption')
      .set('Authorization', `Bearer ${token}`)
      .send({
        petId: pet.id,
      })

    console.log(response.body)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        contact: expect.any(String),
      }),
    )
  })
})
