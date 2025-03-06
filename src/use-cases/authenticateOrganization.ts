import { IOrganizationRepository } from '@/repositories/organization.repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'
import { Either, left, right } from '@/error'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  { organization: Organization }
>

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) return left(new InvalidCredentialsError())

    const doestPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doestPasswordMatches) return left(new InvalidCredentialsError())

    return right({ organization })
  }
}
