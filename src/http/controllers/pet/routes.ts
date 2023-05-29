import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWS } from '@/middlewares/verify-jwt'
import { roleVerify } from '@/middlewares/roleVerify'
import { filter } from './filter'
import { profile } from './profile'
import { adoption } from './adoption'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWS)

  app.post('/pet', { onRequest: [roleVerify('ORG')] }, register)
  app.get('/pet/profile', { onRequest: [roleVerify('ORG')] }, profile)
  app.get('/pet/fearture', { onRequest: [roleVerify('ORG')] }, filter)
  app.post('/pet/adoption', { onRequest: [roleVerify('ORG')] }, adoption)
}
