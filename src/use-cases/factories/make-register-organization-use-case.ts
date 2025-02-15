import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { RegisterOrganizationUseCase } from '../registerOrganization'

export function makeRegisterOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    organizationRepository,
  )

  return registerOrganizationUseCase
}
