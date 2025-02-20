import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organizations/organization.routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { petRoutes } from './http/controllers/pets/pet.routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(organizationRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
