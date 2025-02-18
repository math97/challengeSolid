import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const searchPets = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const searchPetsBodySchema = z.object({
    city: z.string(),
  })

  const { city } = searchPetsBodySchema.parse(request.body)

  const searchPets = makeSearchPetUseCase()
  const pets = await searchPets.execute(city)

  reply.send({ pets })
}
