import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getPet = async (request: FastifyRequest, reply: FastifyReply) => {
  const getPetsBodySchema = z.object({
    id: z.string(),
  })

  const id = getPetsBodySchema.parse(request.params)
  const getPet = makeGetPetUseCase()

  const response = await getPet.execute(id)

  if (response.isLeft()) {
    return reply.status(404).send({ message: response.value.message })
  }

  return reply.status(200).send({ pet: response.value.pet })
}
