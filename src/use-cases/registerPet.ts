import { IOrganizationRepository } from '@/repositories/organization.repository'
import { IPetRepository } from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'
import { OrganizationNotFoundError } from './error/organization-not-found-error'

interface IRegisterPetRequest {
  name: string
  about: string
  age: number
  size: string
  energy: string
  independent: string
  environment: string
  organizationId: string
}

type registerPetUseCaseResponse = { pet: Pet }

export class RegisterPetUseCase {
  constructor(
    private petRepository: IPetRepository,
    private organizationRepository: IOrganizationRepository,
  ) {}

  async execute(
    data: IRegisterPetRequest,
  ): Promise<registerPetUseCaseResponse> {
    const organization = await this.organizationRepository.findById(
      data.organizationId,
    )

    if (!organization) throw new OrganizationNotFoundError()

    const pet = await this.petRepository.create({
      ...data,
      organization_id: organization.id,
    })

    return { pet }
  }
}
