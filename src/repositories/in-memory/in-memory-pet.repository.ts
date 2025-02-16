import { Prisma, Pet } from '@prisma/client'
import { IPetRepository } from '../pet.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements IPetRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independent: data.independent,
      environment: data.environment,
      organization_id: data.organization_id,
    }
    this.pets.push(pet)

    return pet
  }
}
