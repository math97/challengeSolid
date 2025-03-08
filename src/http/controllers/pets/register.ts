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
  })

  const body = registerPetBodySchema.parse(request.body)

  const organizationId = request.user.sub

  const registerPetUseCase = makeRegisterPetUseCase()

  const response = await registerPetUseCase.execute({
    ...body,
    organization_id: organizationId,
  })

  if (response.isLeft()) {
    return reply.status(400).send({ message: response.value.message })
  }

  return reply.status(201).send(response.value.pet)
}
