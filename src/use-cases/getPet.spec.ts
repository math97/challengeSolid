import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './getPet'
import { makeOrganizationHashed } from '@/test/factories/makeOrganization'
import { makePet } from '@/test/factories/makePet'

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
    const organization = await organizationRepository.create(
      makeOrganizationHashed(),
    )

    const expectedPet = await petsRepository.create(
      makePet({ organizationId: organization.id }),
    )

    const { pet } = await sut.execute({ id: expectedPet.id })

    expect(pet).toEqual(expectedPet)
  })

  it('should throw an error if pet is not found', async () => {
    await expect(sut.execute({ id: 'invalid-id' })).rejects.toThrow(
      'Pet not found',
    )
  })
})
