import { OrgRepository } from '@/repository/main/orgRepository'
import { PetRepository } from '@/repository/main/petRepository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name: string
  description: string | null
  age: string
  city: string
  org_id: string
  independence: string
  habitat: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    name,
    description,
    independence,
    age,
    org_id,
    city,
    habitat,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const findOrg = await this.orgRepository.findById(org_id)

    if (!findOrg) {
      throw new Error()
    }

    const pet = await this.petRepository.create({
      name,
      description,
      independence,
      age,
      org_id,
      city,
      habitat,
    })

    return {
      pet,
    }
  }
}
