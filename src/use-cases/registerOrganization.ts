import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { Organization } from '@prisma/client'

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

export async function registerOrganizationUseCase(
  organizationData: registerOrganizationUseCaseRequest,
): Promise<registerOrganizationUseCaseResponse> {
  const organizationRepository = new PrismaOrganizationRepository()

  const organizationByEmail = await organizationRepository.findByEmail(
    organizationData.email,
  )

  if (organizationByEmail) throw new Error('Organization already exists')

  const organization = await organizationRepository.create(organizationData)

  return { organization }
}
