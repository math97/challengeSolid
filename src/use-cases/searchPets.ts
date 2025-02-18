import { IPetRepository } from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'

export class SearchPets {
  constructor(private petRepository: IPetRepository) {}

  async execute(city: string): Promise<Pet[]> {
    return this.petRepository.findAll(city)
  }
}
