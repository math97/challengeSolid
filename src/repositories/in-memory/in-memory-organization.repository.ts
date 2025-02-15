import { Organization, Prisma } from '@prisma/client'
import { IOrganizationRepository } from '../organization.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  public organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      password_hash: data.password_hash,
      email: data.email,
      city: data.city,
      name: data.name || '',
      address: data.address || '',
      state: data.state || '',
      whatsapp: data.whatsapp || '',
      postalCode: data.postalCode || '',
      description: data.description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.organizations.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.email === email,
    )

    if (!organization) return null

    return organization
  }
}
