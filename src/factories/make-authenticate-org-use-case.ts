import { PrismaOrgRepository } from '@/repository/prisma/prisma-org-repository'
import { AuthenticateOrgUseCase } from '@/useCase/org/authenticate'

export function makeAuthenticateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const useCase = new AuthenticateOrgUseCase(orgRepository)

  return useCase
}
