import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetUseCase } from '../getPet'

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const getPetUseCase = new GetPetUseCase(petRepository)

  return getPetUseCase
}
