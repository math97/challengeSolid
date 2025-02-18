import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPets } from './searchPets'
import { mockOrganization } from '@/test/mock/organization'
import { mockPet } from '@/test/mock/pet'

describe('SearchPetsUseCase', () => {
  let petsRepository: InMemoryPetRepository
  let organizationRepository: InMemoryOrganizationRepository
  let sut: SearchPets

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetRepository(organizationRepository)
    sut = new SearchPets(petsRepository)
  })

  it('should search pets successfully', async () => {
    const organizationData = await mockOrganization()
    const organization = await organizationRepository.create({
      ...organizationData[0],
    })
    const organization2 = await organizationRepository.create({
      ...organizationData[1],
    })

    const petData = await mockPet(organization.id)
    const petData2 = await mockPet(organization2.id)
    await petsRepository.create({ ...petData[0] })
    await petsRepository.create({ ...petData[1] })
    await petsRepository.create({ ...petData2[0] })

    const pets = await sut.execute(organization.city)

    expect(pets).toHaveLength(2)

    const pets2 = await sut.execute(organization2.city)

    expect(pets2).toHaveLength(1)
  })
})
