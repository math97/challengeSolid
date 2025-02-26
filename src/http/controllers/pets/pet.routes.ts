import { FastifyInstance } from 'fastify'
import { registerPet } from './register'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { searchPets } from './searchPets'
import { getPet } from './getPet'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: verifyJwt }, registerPet)
  app.get('/pets', searchPets)
  app.get('/pet/:id', getPet)
}
