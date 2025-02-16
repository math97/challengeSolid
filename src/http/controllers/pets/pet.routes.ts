import { FastifyInstance } from 'fastify'
import { registerPet } from './register'
import { verifyJwt } from '@/http/middleware/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: verifyJwt }, registerPet)
}
