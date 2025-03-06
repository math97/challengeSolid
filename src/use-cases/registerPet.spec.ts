import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './registerPet'
import { OrganizationNotFoundError } from './error/organization-not-found-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { makeOrganizationHashed } from '@/test/factories/makeOrganization'
import { makePet } from '@/test/factories/makePet'

describe('RegisterPetUseCase', () => {
  let organizationRepository: InMemoryOrganizationRepository
  let petRepository: InMemoryPetRepository
  let sut: RegisterPetUseCase

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository(organizationRepository)

    sut = new RegisterPetUseCase(petRepository, organizationRepository)
  })

  it('should register a pet successfully', async () => {
    const organization = await organizationRepository.create(
      makeOrganizationHashed(),
    )

    const response = await sut.execute(
      makePet({ organizationId: organization.id }),
    )

    expect(petRepository.pets).toHaveLength(1)
    expect(petRepository.pets[0].id).toEqual(expect.any(String))
    expect(response.isRight()).toBe(true)
  })

  it('should throw an error if organization is not found', async () => {
    const response = await sut.execute(
      makePet({ organizationId: 'fakeOrganizationId' }),
    )
    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(OrganizationNotFoundError)
  })
})
