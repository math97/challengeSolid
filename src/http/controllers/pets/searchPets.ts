import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const searchPets = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchPetsBodySchema = z.object({
    city: z.string(),
    age: z.coerce.number().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    independent: z.string().optional(),
    environment: z.string().optional(),
  })

  const body = searchPetsBodySchema.parse(request.query)
  const searchPets = makeSearchPetUseCase()

  const response = await searchPets.execute(body)

  if (response.isLeft()) {
    return reply.status(500).send({ message: 'Internal server error' })
  }

  return reply.status(200).send({ pets: response.value.pets })
}
