import { OrgInMemoryRepository } from '@/repository/in-memory/org-In-Memory-Repository'
import { PetInMemoryRepository } from '@/repository/in-memory/pet-In-Memory-Repository'
import { RegisterPetUseCase } from '@/useCase/pet/register'
import { hash } from 'bcryptjs'
import { beforeEach, expect, describe, it } from 'vitest'

let petRepository: PetInMemoryRepository
let orgRepository: OrgInMemoryRepository
let sut: RegisterPetUseCase

describe('Register Pet UseCase Test', () => {
  beforeEach(() => {
    petRepository = new PetInMemoryRepository()
    orgRepository = new OrgInMemoryRepository()
    sut = new RegisterPetUseCase(petRepository, orgRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('É possivel registrar um pet?', async () => {
    const org = await orgRepository.create({
      name: 'org test',
      email: 'email@test.com',
      password_hash: await hash('123456', 6),
      zip_code: 22511747,
      number: 2198754182,
      address: '',
      city: '',
    })

    const { pet } = await sut.execute({
      name: 'toby',
      description: '',
      age: 'test',
      independence: '',
      org_id: org.id,
      city: '',
      habitat: '',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
