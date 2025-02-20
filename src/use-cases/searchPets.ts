import {
  IPetRepository,
  SearchPetsRequest,
} from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPets {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petRepository.findAll(data)

    return { pets }
  }
}
