import { PetRepository } from '@/repository/main/petRepository'
import { Pet } from '@prisma/client'

interface FeatureFilterUseCaseRequest {
  data: {
    city: string
    age?: string
    independence?: string
    habitat?: string
  }
}

interface FeatureFilterUseCaseResponse {
  pets: Pet[]
}

export class FeatureFilterUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    data,
  }: FeatureFilterUseCaseRequest): Promise<FeatureFilterUseCaseResponse> {
    const pets = await this.petRepository.featureFilter(data)

    return {
      pets,
    }
  }
}
