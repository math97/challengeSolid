import { registerOrganizationUseCase } from '@/use-cases/registerOrganization'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationBodySchema = z.object({
    city: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    whatsapp: z.string().optional(),
    address: z.string().optional(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    description: z.string().optional(),
  })

  const body = registerOrganizationBodySchema.parse(request.body)

  try {
    const organization = await registerOrganizationUseCase(body)
    console.log(organization)
    return reply.status(201).send(organization)
  } catch (error) {
    console.log(error)

    return reply
      .status(400)
      .send({ message: 'Not able to create organization' })
  }
}
