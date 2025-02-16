import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register'
import { authenticate } from './authenticate'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organization', registerOrganization)
  app.post('/organization/session', authenticate)
}
