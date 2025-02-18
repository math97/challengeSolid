import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export const mockOrganization = async () => {
  const hashedPassword = await hash('test123', 8)

  return [
    {
      id: randomUUID(),
      email: 'org1@test.com',
      password_hash: hashedPassword,
      name: 'Test Organization',
      address: '123 Test St',
      whatsapp: '123-456-7890',
      city: 'Lisbon',
      postalCode: '12345',
      state: 'TS',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      email: 'org2@test.com',
      password_hash: hashedPassword,
      name: 'Test Organization',
      address: '123 Test St',
      whatsapp: '123-456-7890',
      city: 'São Paulo',
      postalCode: '12345',
      state: 'TS',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
