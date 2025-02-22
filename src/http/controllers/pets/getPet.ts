import { PetNotFoundError } from '@/use-cases/error/pet-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getPet = async (request: FastifyRequest, reply: FastifyReply) => {
  const getPetsBodySchema = z.object({
    id: z.string(),
  })

  const id = getPetsBodySchema.parse(request.query)
  const getPet = makeGetPetUseCase()

  try {
    const { pet } = await getPet.execute(id)

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof PetNotFoundError)
      return reply.status(404).send({ message: error.message })

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
