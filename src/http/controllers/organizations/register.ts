import { OrganizationAlreadyExistsError } from '@/use-cases/error/organization-already-exist-error'
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

  try {
    const organization = await registerOrganizationUseCase.execute(body)
    return reply.status(201).send(organization)
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
