import { makeCreateOrgUseCase } from '@/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodyBySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    zip_code: z.number(),
    number: z.number(),
    address: z.string(),
    city: z.string(),
  })

  const { address, city, email, name, number, password, zip_code } =
    createOrgBodyBySchema.parse(request.body)

  const createUseCase = makeCreateOrgUseCase()

  await createUseCase.execute({
    address,
    city,
    email,
    name,
    number,
    password,
    zip_code,
  })

  return reply.status(201).send()
}
