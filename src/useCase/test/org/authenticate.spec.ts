import { OrgInMemoryRepository } from '@/repository/in-memory/org-In-Memory-Repository'
import { AuthenticateOrgUseCase } from '@/useCase/org/authenticate'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let orgRepository: OrgInMemoryRepository
let sut: AuthenticateOrgUseCase

describe('Register Pet UseCase Test', () => {
  beforeEach(() => {
    orgRepository = new OrgInMemoryRepository()
    sut = new AuthenticateOrgUseCase(orgRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('É possivel fazer login e autenticar uma organização?', async () => {
    const createOrg = await orgRepository.create({
      name: 'org test',
      email: 'email@test.com',
      password_hash: await hash('123456', 6),
      zip_code: 22511747,
      number: 2198754182,
      address: '',
      city: '',
    })

    const { org } = await sut.execute({
      email: 'email@test.com',
      password: '123456',
    })

    expect(org.id).toEqual(createOrg.id)
  })
})
