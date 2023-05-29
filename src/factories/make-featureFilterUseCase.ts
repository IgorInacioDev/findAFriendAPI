import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { FeatureFilterUseCase } from '@/useCase/pet/filter'

export function makeFeatureFilterUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new FeatureFilterUseCase(petRepository)

  return useCase
}
