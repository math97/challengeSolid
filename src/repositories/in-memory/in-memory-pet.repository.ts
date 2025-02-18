import { Prisma, Pet } from '@prisma/client'
import { IPetRepository } from '../pet.repository'
import { randomUUID } from 'node:crypto'
import { InMemoryOrganizationRepository } from './in-memory-organization.repository'

export class InMemoryPetRepository implements IPetRepository {
  public pets: Pet[] = []

  constructor(private organizationRepository: InMemoryOrganizationRepository) {}

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

  async findAll(city: string): Promise<Pet[]> {
    const orgsByCity = this.organizationRepository.organizations.filter(
      (org) => org.city === city,
    )

    const pets = this.pets.filter((pet) =>
      orgsByCity.some((org) => org.id === pet.organization_id),
    )

    return pets
  }
}
