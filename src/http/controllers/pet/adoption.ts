import { makeAdoptionUseCase } from '@/factories/make-adoptionUseCase'
import { makeProfilePetUseCase } from '@/factories/make-profilePet-UseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adoption(request: FastifyRequest, reply: FastifyReply) {
  const profilePetRequets = z.object({
    petId: z.string(),
  })

  const adoptionUseCase = makeAdoptionUseCase()
  const profilePetUseCase = makeProfilePetUseCase()

  const { petId } = profilePetRequets.parse(request.body)

  const { pet } = await profilePetUseCase.execute({
    id: petId,
  })

  const { contact } = await adoptionUseCase.execute({
    orgId: pet.org_id,
    petId,
  })

  return reply.status(201).send({
    contact,
  })
}
