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
  organization_id: string
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
      data.organization_id,
    )

    if (!organization) throw new OrganizationNotFoundError()

    const pet = await this.petRepository.create({
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independent: data.independent,
      environment: data.environment,
      organization_id: organization.id,
    })

    return { pet }
  }
}
