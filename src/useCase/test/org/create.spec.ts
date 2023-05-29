import { OrgInMemoryRepository } from '@/repository/in-memory/org-In-Memory-Repository'
import { CreateOrgUseCase } from '@/useCase/org/create'
import { beforeEach, expect, describe, it } from 'vitest'

let orgRepository: OrgInMemoryRepository
let sut: CreateOrgUseCase

describe('Register Pet UseCase Test', () => {
  beforeEach(() => {
    orgRepository = new OrgInMemoryRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('É possivel cadastrar uma organização?', async () => {
    const { org } = await sut.execute({
      name: 'org test',
      email: 'email@test.com',
      password: 'password',
      zip_code: 22511747,
      number: 2198754182,
      address: '',
      city: '',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
