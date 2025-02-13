import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organizations/organization.routes'

export const app = fastify()

app.register(organizationRoutes)
