import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '../registerPet'

export function makeRegisterPetUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const petRepository = new PrismaPetRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    petRepository,
    organizationRepository,
  )

  return registerPetUseCase
}
