import { Prisma, Pet } from '@prisma/client'
import { IPetRepository, SearchPetsRequest } from '../pet.repository'
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

  async findAll(data: SearchPetsRequest): Promise<Pet[]> {
    const organizationByCity = this.organizationRepository.organizations.filter(
      (org) => org.city === data.city,
    )

    const pets = this.pets
      .filter((pet) =>
        organizationByCity.some(
          (organization) => organization.id === pet.organization_id,
        ),
      )
      .filter((pet) => (data.age ? pet.age === data.age : true))
      .filter((pet) => (data.size ? pet.size === data.size : true))
      .filter((pet) => (data.energy ? pet.energy === data.energy : true))
      .filter((pet) =>
        data.environment ? pet.environment === data.environment : true,
      )
      .filter((pet) =>
        data.independent ? pet.independent === data.independent : true,
      )

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    return pet ?? null
  }
}
