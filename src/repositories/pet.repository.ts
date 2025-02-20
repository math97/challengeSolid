import { Pet, Prisma } from '@prisma/client'

export interface SearchPetsRequest {
  city: string
  age?: number
  size?: string
  energy?: string
  independent?: string
  environment?: string
}

export interface IPetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAll(data: SearchPetsRequest): Promise<Pet[]>
}
