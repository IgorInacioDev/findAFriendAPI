import { makeRegisterPetUseCase } from '@/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyBySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.string(),
    city: z.string(),
    independence: z.string(),
    habitat: z.string(),
  })

  const { name, age, city, description, habitat, independence } =
    registerBodyBySchema.parse(request.body)

  const registerUseCase = makeRegisterPetUseCase()

  const { pet } = await registerUseCase.execute({
    age,
    city,
    description,
    habitat,
    independence,
    name,
    org_id: request.user.sub,
  })

  return reply.status(201).send(pet)
}
