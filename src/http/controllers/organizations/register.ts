import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationUseCase = makeRegisterOrganizationUseCase()
  const registerOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string(),
    name: z.string(),
    whatsapp: z.string(),
    address: z.string(),
    postalCode: z.string(),
    state: z.string(),
    description: z.string().optional(),
  })

  const body = registerOrganizationBodySchema.parse(request.body)

  const response = await registerOrganizationUseCase.execute(body)
  if (response.isLeft()) {
    return reply.status(400).send({ message: response.value.message })
  }

  return reply.status(201).send(response.value.organization)
}
