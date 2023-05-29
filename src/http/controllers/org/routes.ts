import { FastifyInstance } from 'fastify'
import { createOrg } from './create'
import { authenticateOrg } from './authenticate'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/org/register', createOrg)
  app.post('/org', authenticateOrg)
}
