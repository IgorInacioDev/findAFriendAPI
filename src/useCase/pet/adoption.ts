import { OrgRepository } from '@/repository/main/orgRepository'
import { PetRepository } from '@/repository/main/petRepository'
import { Decimal } from '@prisma/client/runtime'

interface AdoptionUseCaseRequest {
  orgId: string
  petId: string
}

interface AdoptionUseCaseResponse {
  contact: Decimal
}

export class AdoptionUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    orgId,
    petId,
  }: AdoptionUseCaseRequest): Promise<AdoptionUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)
    if (!org) {
      throw new Error()
    }

    const pet = await this.petRepository.profilePet(petId)
    if (!pet) {
      throw new Error()
    }

    if (pet.org_id !== org.id) {
      throw new Error()
    }

    const contact = org.number

    return {
      contact,
    }
  }
}
