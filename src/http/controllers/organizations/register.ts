import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationBodySchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    whatsapp: z.string(),
    address: z.string(),
    postalCode: z.string(),
    city: z.string(),
    state: z.string(),
    description: z.string().optional(),
  })

  const {
    name,
    email,
    address,
    city,
    postalCode,
    state,
    whatsapp,
    description,
  } = registerOrganizationBodySchema.parse(request.body)
  await prisma.organization.create({
    data: {
      name,
      email,
      address,
      city,
      postalCode,
      state,
      whatsapp,
      description,
    },
  })
  return reply.status(201).send()
}
