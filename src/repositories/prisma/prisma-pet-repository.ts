import { Pet, Prisma } from '@prisma/client'
import { IPetRepository } from '../pet.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements IPetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findAll(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
      },
    })
    return pets
  }
}
