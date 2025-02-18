import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPets } from '../searchPets'

export function makeSearchPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const searchPetUseCase = new SearchPets(petRepository)

  return searchPetUseCase
}
