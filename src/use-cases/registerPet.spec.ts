import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './registerPet'
import { OrganizationNotFoundError } from './error/organization-not-found-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { RegisterOrganizationUseCase } from './registerOrganization'

describe('RegisterPetUseCase', () => {
  let organizationRepository: InMemoryOrganizationRepository
  let petRepository: InMemoryPetRepository
  let registerOrganizationUseCase: RegisterOrganizationUseCase
  let sut: RegisterPetUseCase

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository(organizationRepository)
    registerOrganizationUseCase = new RegisterOrganizationUseCase(
      organizationRepository,
    )
    sut = new RegisterPetUseCase(petRepository, organizationRepository)
  })

  it('should register a pet successfully', async () => {
    const organizationData = {
      name: 'Test Organization',
      password: '123456',
      email: 'test@organization.com',
      address: '123 Test St',
      whatsapp: '123-456-7890',
      city: 'Test City',
      description: 'Test Description',
      postalCode: '12345',
      state: 'TS',
    }

    await registerOrganizationUseCase.execute(organizationData)

    const organization = await organizationRepository.findByEmail(
      organizationData.email,
    )
    const petData = {
      name: 'Buddy',
      about: 'Friendly dog',
      age: 2,
      size: 'Medium',
      energy: 'High',
      independent: 'Yes',
      environment: 'House',
      organizationId: organization?.id || '',
    }

    const { pet } = await sut.execute(petData)

    expect(petRepository.pets).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should throw an error if organization is not found', async () => {
    const petData = {
      name: 'Buddy',
      about: 'Friendly dog',
      age: 2,
      size: 'Medium',
      energy: 'High',
      independent: 'Yes',
      environment: 'House',
      organizationId: 'org-2',
    }

    await expect(sut.execute(petData)).rejects.toThrow(
      OrganizationNotFoundError,
    )
  })
})
