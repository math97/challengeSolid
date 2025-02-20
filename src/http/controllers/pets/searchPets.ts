import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const searchPets = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchPetsBodySchema = z.object({
    city: z.string(),
    age: z.number().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    independent: z.string().optional(),
    environment: z.string().optional(),
  })

  const body = searchPetsBodySchema.parse(request.query)
  const searchPets = makeSearchPetUseCase()

  try {
    const { pets } = await searchPets.execute(body)

    return reply.status(200).send({ pets })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
