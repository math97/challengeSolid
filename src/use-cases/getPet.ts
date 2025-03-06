import { IPetRepository } from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './error/pet-not-found-error'
import { Either, left, right } from '@/error'

interface GetPetUseCaseRequest {
  id: string
}

type GetPetUseCaseResponse = Either<PetNotFoundError, { pet: Pet }>

export class GetPetUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) return left(new PetNotFoundError())

    return right({ pet })
  }
}
