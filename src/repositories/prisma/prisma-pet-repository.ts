import { Pet, Prisma } from '@prisma/client'
import { IPetRepository, SearchPetsRequest } from '../pet.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements IPetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findAll(data: SearchPetsRequest): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: data.age,
        size: data.size,
        energy: data.energy,
        environment: data.environment,
        independent: data.independent,
        organization: {
          city: data.city,
        },
      },
    })
    return pets
  }
}
