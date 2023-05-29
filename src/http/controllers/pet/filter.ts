import { makeFeatureFilterUseCase } from '@/factories/make-featureFilterUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const featureFilterRequest = z.object({
    city: z.string(),
    age: z
      .union([z.enum(['CUB', 'ADULT', 'ELDERLY']), z.undefined()])
      .nullable(),
    independence: z
      .union([z.enum(['LITTLE', 'AVERAGE', 'BIG']), z.undefined()])
      .nullable(),
    habitat: z
      .union([z.enum(['LITTLE', 'AVERAGE', 'BIG']), z.undefined()])
      .nullable(),
  })

  const { city, age, independence, habitat } = featureFilterRequest.parse(
    request.headers,
  )

  const registerUseCase = makeFeatureFilterUseCase()

  const pets = await registerUseCase.execute({
    data: {
      city,
      age: age ?? undefined,
      independence: independence ?? undefined,
      habitat: habitat ?? undefined,
    },
  })

  return reply.status(201).send(pets)
}
