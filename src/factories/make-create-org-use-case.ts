import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '@/useCase/org/create'

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const useCase = new CreateOrgUseCase(orgRepository)

  return useCase
}
