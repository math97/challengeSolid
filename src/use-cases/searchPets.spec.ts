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

    const { pets } = await sut.execute({ city: organization.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: organization2.city })

    expect(pets2).toHaveLength(1)
  })

  describe('search with filters', () => {
    it.each([
      { filter: 'age', value: 2, expected: 1 },
      { filter: 'energy', value: 'High', expected: 1 },
      { filter: 'environment', value: 'Indoor', expected: 1 },
      { filter: 'independent', value: 'low', expected: 1 },
      { filter: 'size', value: 'Medium', expected: 1 },
    ])(
      'should be able to search pets by city and $filter',
      async ({ filter, value, expected }) => {
        const organizationData = await mockOrganization()
        const organization = await organizationRepository.create({
          ...organizationData[0],
        })

        const petData = await mockPet(organization.id)

        await petsRepository.create({ ...petData[0] })
        await petsRepository.create({ ...petData[1] })

        const { pets } = await sut.execute({
          city: organization.city,
          [filter]: value,
        })

        expect(pets).toHaveLength(expected)
      },
    )
  })
})
