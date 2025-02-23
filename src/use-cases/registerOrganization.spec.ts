import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { RegisterOrganizationUseCase } from './registerOrganization'
import { describe, beforeEach, it, expect } from 'vitest'
import { makeOrganization } from '@/test/factories/makeOrganization'

describe('Create Org Use Case', () => {
  let organizationsRepository: InMemoryOrganizationRepository
  let sut: RegisterOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new org', async () => {
    const { organization } = await sut.execute(makeOrganization())

    expect(organizationsRepository.organizations).toHaveLength(1)
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with the same email', async () => {
    const organization = makeOrganization()
    await sut.execute(organization)

    await expect(sut.execute(organization)).rejects.toThrow(
      'Organization already exists.',
    )
  })
})
