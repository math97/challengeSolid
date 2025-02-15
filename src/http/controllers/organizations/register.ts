import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { OrganizationAlreadyExistsError } from '@/use-cases/error/organization-already-exist-error'
import { RegisterOrganizationUseCase } from '@/use-cases/registerOrganization'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const organizationRepository = new PrismaOrganizationRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    organizationRepository,
  )

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
    const organization = await registerOrganizationUseCase.execute(body)
    console.log(organization)
    return reply.status(201).send(organization)
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
