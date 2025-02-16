import { OrganizationNotFoundError } from '@/use-cases/error/organization-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.coerce.number(),
    size: z.string(),
    energy: z.string(),
    independent: z.string(),
    environment: z.string(),
    organizationId: z.string(),
  })

  const body = registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  try {
    const pet = await registerPetUseCase.execute(body)

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
