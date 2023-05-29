import { makeAuthenticateOrgUseCase } from '@/factories/make-authenticate-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)
  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  const { org } = await authenticateOrgUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {
      role: org.role,
    },
    {
      sign: {
        sub: org.id,
      },
    },
  )

  return reply
    .setCookie('token', token, {
      path: '/',
    })
    .status(200)
    .send({
      token,
    })
}
