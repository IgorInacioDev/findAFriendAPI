import { Pet } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface PetInterfaceReply {
  pet: Pet
  token: string
}

export async function createOrgTestE2E(app: FastifyInstance) {
  const org = await request(app.server).post('/org/register').send({
    address: 'Estrada do Java, 720',
    city: 'Rio de Janeiro',
    email: 'test@gmail.com',
    name: 'Java Pet',
    number: 2198075124,
    password: '123456',
    zip_code: 22548741,
  })

  const authResponse = await request(app.server).post('/org').send({
    email: 'test@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  // console.log(token, org)
  return {
    org,
    token,
  }
}

export async function createPetTestE2E(
  app: FastifyInstance,
): Promise<PetInterfaceReply> {
  const { token } = await createOrgTestE2E(app)

  const createPet = await request(app.server)
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

  const { pet } = createPet.body

  return {
    token,
    pet,
  }
}
