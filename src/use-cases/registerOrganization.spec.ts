import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { RegisterOrganizationUseCase } from './registerOrganization'
import { describe, beforeEach, it, expect } from 'vitest'
import { makeOrganization } from '@/test/factories/makeOrganization'
import { OrganizationAlreadyExistsError } from './error/organization-already-exist-error'

describe('Create Org Use Case', () => {
  let organizationsRepository: InMemoryOrganizationRepository
  let sut: RegisterOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a new org', async () => {
    const organization = makeOrganization()
    const response = await sut.execute(organization)

    expect(organizationsRepository.organizations).toHaveLength(1)
    expect(response.isRight()).toBe(true)
    expect(organizationsRepository.organizations[0].id).toEqual(
      expect.any(String),
    )
  })

  it('should not be able to create a new org with the same email', async () => {
    const organization = makeOrganization()
    await sut.execute(organization)

    const response = await sut.execute(organization)

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
