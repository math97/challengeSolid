import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organizations/organization.routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(organizationRoutes)
