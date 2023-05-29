import { PetInMemoryRepository } from '@/repository/in-memory/pet-In-Memory-Repository'
import { ProfilePetUseCase } from '@/useCase/pet/profile'
import { beforeEach, expect, describe, it } from 'vitest'

let petRepository: PetInMemoryRepository
let sut: ProfilePetUseCase

describe('Register Pet UseCase Test', () => {
  beforeEach(() => {
    petRepository = new PetInMemoryRepository()
    sut = new ProfilePetUseCase(petRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('É retornar o perfil do pet desejado?', async () => {
    const createPet = await petRepository.create({
      name: 'toby',
      description: '',
      age: 'test',
      independence: '',
      org_id: '',
      city: '',
      habitat: '',
    })

    await petRepository.create({
      name: 'porpcorn',
      description: '',
      age: 'test',
      independence: '',
      org_id: '',
      city: '',
      habitat: '',
    })

    const { pet } = await sut.execute({
      id: createPet.id,
    })

    expect(pet?.name).toEqual('toby')
    expect(pet?.id).toEqual(createPet.id)
  })
})
