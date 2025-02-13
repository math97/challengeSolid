import { prisma } from '@/lib/prisma'
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
  const organizationByEmail = await prisma.organization.findUnique({
    where: { email: organizationData.email },
  })

  if (organizationByEmail) throw new Error('Organization already exists')

  const organization = await prisma.organization.create({
    data: organizationData,
  })

  return { organization }
}
