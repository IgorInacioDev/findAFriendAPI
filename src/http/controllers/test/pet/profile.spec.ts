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

  it('pet get profile', async () => {
    const { pet, token } = await createPetTestE2E(app)

    const response = await request(app.server)
      .get('/pet/profile')
      .set('Authorization', `Bearer ${token}`)
      .set('id', `${pet.id}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
