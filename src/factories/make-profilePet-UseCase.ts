import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { ProfilePetUseCase } from '@/useCase/pet/profile'

export function makeProfilePetUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new ProfilePetUseCase(petRepository)

  return useCase
}
