import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticateOrganization'
import { IOrganizationRepository } from '@/repositories/organization.repository'
import { InvalidCredentialsError } from './error/invalid-credentials-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { makeOrganizationHashed } from '@/test/factories/makeOrganization'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

describe('AuthenticateOrganizationUseCase', () => {
  let sut: AuthenticateOrganizationUseCase
  let organizationRepository: IOrganizationRepository

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('should authenticate an organization with valid credentials', async () => {
    const password = faker.internet.password()
    const organizationData = makeOrganizationHashed({
      password: await hash(password, 8),
    })

    const organization = await organizationRepository.create({
      ...organizationData,
    })

    const response = await sut.execute({
      email: organizationData.email,
      password,
    })

    expect(response.isRight()).toBe(true)
    if (response.isRight()) {
      expect(response.value.organization.id).toEqual(organization.id)
    }
  })

  it('should throw an error if credentials are invalid', async () => {
    const password = faker.internet.password()
    const organizationData = makeOrganizationHashed({
      password: await hash(password, 8),
    })
    await organizationRepository.create({
      ...organizationData,
    })

    const response = await sut.execute({
      email: organizationData.email,
      password: 'wrongpassword',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
