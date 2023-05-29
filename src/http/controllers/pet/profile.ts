import { makeProfilePetUseCase } from '@/factories/make-profilePet-UseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profilePetRequets = z.object({
    id: z.string().uuid(),
  })

  const profilePetUseCase = makeProfilePetUseCase()

  const { id } = profilePetRequets.parse(request.headers)

  const { pet } = await profilePetUseCase.execute({
    id,
  })

  return reply.status(201).send({
    pet,
  })
}
