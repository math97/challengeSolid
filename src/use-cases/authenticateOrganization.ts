import { IOrganizationRepository } from '@/repositories/organization.repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) throw new InvalidCredentialsError()

    const doestPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doestPasswordMatches) throw new InvalidCredentialsError()

    return {
      organization,
    }
  }
}
