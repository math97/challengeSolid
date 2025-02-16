import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationUseCase } from '../authenticateOrganization'

export function makeAuthenticateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationRepository,
  )

  return authenticateOrganizationUseCase
}
