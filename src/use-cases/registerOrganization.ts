import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { Organization } from '@prisma/client'
import { OrganizationAlreadyExistsError } from './error/organization-already-exist-error'

interface registerOrganizationUseCaseRequest {
  city: string
  email: string
  name?: string
  address?: string
  postalCode?: string
  state?: string
  whatsapp?: string
  description?: string
}

type registerOrganizationUseCaseResponse = { organization: Organization }

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: PrismaOrganizationRepository) {}

  async execute(
    organizationData: registerOrganizationUseCaseRequest,
  ): Promise<registerOrganizationUseCaseResponse> {
    const organizationByEmail = await this.organizationRepository.findByEmail(
      organizationData.email,
    )

    if (organizationByEmail) throw new OrganizationAlreadyExistsError()

    const organization =
      await this.organizationRepository.create(organizationData)

    return { organization }
  }
}
