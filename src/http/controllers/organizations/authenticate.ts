import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateOrganizationUseCase()
  const response = await authenticateUseCase.execute({
    email,
    password,
  })

  if (response.isLeft()) {
    return reply.status(400).send({ message: response.value.message })
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: { sub: response.value.organization.id },
    },
  )

  return reply.status(200).send({
    token,
  })
}
