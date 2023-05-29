import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '@/useCase/pet/register'

export function makeRegisterPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const useCase = new RegisterPetUseCase(petRepository, orgRepository)

  return useCase
}
