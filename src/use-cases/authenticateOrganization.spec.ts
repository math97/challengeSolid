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

    const { organization: organizationAuthenticated } = await sut.execute({
      email: organizationData.email,
      password,
    })

    expect(organizationAuthenticated).toHaveProperty('id')
    expect(organizationAuthenticated).toEqual(organization)
  })

  it('should throw an error if credentials are invalid', async () => {
    const password = faker.internet.password()
    const organizationData = makeOrganizationHashed({
      password: await hash(password, 8),
    })
    await organizationRepository.create({
      ...organizationData,
    })

    await expect(
      sut.execute({ email: organizationData.email, password: 'wrongpassword' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
