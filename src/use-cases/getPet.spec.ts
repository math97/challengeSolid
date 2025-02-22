import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { mockOrganization } from '@/test/mock/organization'
import { mockPet } from '@/test/mock/pet'
import { GetPetUseCase } from './getPet'

describe('GetPetUseCase', () => {
  let petsRepository: InMemoryPetRepository
  let organizationRepository: InMemoryOrganizationRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetRepository(organizationRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should return pet successfully', async () => {
    const organizationData = await mockOrganization()
    const organization = await organizationRepository.create({
      ...organizationData[0],
    })

    const petData = await mockPet(organization.id)
    const expectedPet = await petsRepository.create({ ...petData[0] })

    const { pet } = await sut.execute({ id: expectedPet.id })

    expect(pet).toEqual(expectedPet)
  })

  it('should throw an error if pet is not found', async () => {
    await expect(sut.execute({ id: 'invalid-id' })).rejects.toThrow(
      'Pet not found',
    )
  })
})
