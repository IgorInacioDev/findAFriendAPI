import { OrgInMemoryRepository } from '@/repository/in-memory/org-In-Memory-Repository'
import { PetInMemoryRepository } from '@/repository/in-memory/pet-In-Memory-Repository'
import { AdoptionUseCase } from '@/useCase/pet/adoption'
import { hash } from 'bcryptjs'
import { beforeEach, expect, describe, it } from 'vitest'

let petRepository: PetInMemoryRepository
let orgRepository: OrgInMemoryRepository
let sut: AdoptionUseCase

describe('Register Pet UseCase Test', () => {
  beforeEach(() => {
    petRepository = new PetInMemoryRepository()
    orgRepository = new OrgInMemoryRepository()
    sut = new AdoptionUseCase(petRepository, orgRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('Caso eu queira fazer uma adoção deverar me retornar o numero de contato da org', async () => {
    const org = await orgRepository.create({
      name: 'org test',
      email: 'email@test.com',
      password_hash: await hash('123456', 6),
      zip_code: 22511747,
      number: 2198754182,
      address: '',
      city: '',
    })

    const pet = await petRepository.create({
      name: 'toby',
      description: '',
      age: 'test',
      independence: '',
      org_id: org.id,
      city: '',
      habitat: '',
    })

    const { contact } = await sut.execute({
      orgId: org.id,
      petId: pet.id,
    })

    console.log(contact)
    expect(contact).toEqual(org.number)
  })
})
