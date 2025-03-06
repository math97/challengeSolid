import { Either, right } from '@/error'
import {
  IPetRepository,
  SearchPetsRequest,
} from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'

type SearchPetsResponse = Either<null, { pets: Pet[] }>

export class SearchPets {
  constructor(private petRepository: IPetRepository) {}

  async execute(data: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petRepository.findAll(data)

    return right({ pets })
  }
}
