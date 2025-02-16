import { Organization, Prisma } from '@prisma/client'
import { IOrganizationRepository } from '../organization.repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({ data })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return prisma.organization.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<Organization | null> {
    return prisma.organization.findUnique({ where: { id } })
  }
}
