import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticateOrganization'
import { IOrganizationRepository } from '@/repositories/organization.repository'
import { InvalidCredentialsError } from './error/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import { randomUUID } from 'node:crypto'

describe('AuthenticateOrganizationUseCase', () => {
  let sut: AuthenticateOrganizationUseCase
  let organizationRepository: IOrganizationRepository

  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('should authenticate an organization with valid credentials', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    const hashedPassword = await hash(password, 8)

    organizationRepository.create({
      id: randomUUID(),
      email,
      password_hash: hashedPassword,
      name: 'Test Organization',
      address: '123 Test St',
      whatsapp: '123-456-7890',
      city: 'Test City',
      postalCode: '12345',
      state: 'TS',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const response = await sut.execute({
      email,
      password,
    })

    expect(response.organization).toHaveProperty('id')
    expect(response.organization.email).toBe(email)
  })

  it('should throw an error if credentials are invalid', async () => {
    const email = 'test@example.com'
    const wrongpassword = 'wrongpassword'
    const correctpassword = 'correctpassword'
    const password_hash = await hash(correctpassword, 8)

    organizationRepository.create({
      id: randomUUID(),
      email,
      password_hash,
      name: 'Test Organization',
      address: '123 Test St',
      whatsapp: '123-456-7890',
      city: 'Test City',
      postalCode: '12345',
      state: 'TS',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(
      sut.execute({ email, password: wrongpassword }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
