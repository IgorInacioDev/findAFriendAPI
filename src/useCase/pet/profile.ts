import { PetRepository } from '@/repository/main/petRepository'
import { Pet } from '@prisma/client'

interface ProfilePetUseCaseRequest {
  id: string
}

interface ProfilePetUseCaseResponse {
  pet: Pet
}

export class ProfilePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    id,
  }: ProfilePetUseCaseRequest): Promise<ProfilePetUseCaseResponse> {
    const pet = await this.petRepository.profilePet(id)

    if (!pet) {
      throw new Error('Pet não existente')
    }

    return {
      pet,
    }
  }
}
