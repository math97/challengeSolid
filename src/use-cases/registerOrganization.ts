import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { Organization } from '@prisma/client'
import { OrganizationAlreadyExistsError } from './error/organization-already-exist-error'
import { hash } from 'bcryptjs'

export interface registerOrganizationUseCaseRequest {
  city: string
  email: string
  name: string
  address: string
  postalCode: string
  state: string
  whatsapp: string
  password: string
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

    const password_hash = await hash(organizationData.password, 6)

    const organization = await this.organizationRepository.create({
      email: organizationData.email,
      name: organizationData.name,
      city: organizationData.city,
      address: organizationData.address,
      postalCode: organizationData.postalCode,
      state: organizationData.state,
      whatsapp: organizationData.whatsapp,
      description: organizationData.description,
      password_hash,
    })

    return { organization }
  }
}
