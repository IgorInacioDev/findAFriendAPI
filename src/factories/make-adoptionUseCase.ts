import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repository/prisma/prisma-pet-repository'
import { AdoptionUseCase } from '@/useCase/pet/adoption'

export function makeAdoptionUseCase() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const useCase = new AdoptionUseCase(petRepository, orgRepository)

  return useCase
}
