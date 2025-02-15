import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import {
  RegisterOrganizationUseCase,
  registerOrganizationUseCaseRequest,
} from './registerOrganization'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Create Org Use Case', () => {
  let organizationsRepository: InMemoryOrganizationRepository
  let sut: RegisterOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new org', async () => {
    const organizationData: registerOrganizationUseCaseRequest = {
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
    const { organization } = await sut.execute(organizationData)

    expect(organizationsRepository.organizations).toHaveLength(1)
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with the same email', async () => {
    const organizationData: registerOrganizationUseCaseRequest = {
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

    await sut.execute(organizationData)

    await expect(sut.execute(organizationData)).rejects.toThrow(
      'Organization already exists.',
    )
  })
})
