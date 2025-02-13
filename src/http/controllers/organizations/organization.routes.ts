import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', registerOrganization)
}
