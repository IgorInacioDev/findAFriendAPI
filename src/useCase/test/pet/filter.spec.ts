import { PetInMemoryRepository } from '@/repository/in-memory/pet-In-Memory-Repository'
import { FeatureFilterUseCase } from '@/useCase/pet/filter'
import { beforeEach, expect, describe, it } from 'vitest'

let petRepository: PetInMemoryRepository
let sut: FeatureFilterUseCase

describe('Register Pet UseCase Test', () => {
  beforeEach(() => {
    petRepository = new PetInMemoryRepository()
    sut = new FeatureFilterUseCase(petRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('É possivel buscar pets pelos filtros?', async () => {
    await petRepository.create({
      name: 'bob',
      description: '',
      age: 'big',
      independence: 'not',
      org_id: '',
      city: 'Rio de Janeiro',
      habitat: '',
    })

    await petRepository.create({
      name: 'toby',
      description: '',
      age: 'big',
      independence: 'not',
      org_id: '',
      city: 'Rio de Janeiro',
      habitat: '',
    })

    await petRepository.create({
      name: 'popcorn',
      description: '',
      age: 'small',
      independence: 'not',
      org_id: '',
      city: 'Rio de Janeiro',
      habitat: '',
    })

    const { pets } = await sut.execute({
      data: {
        city: 'Rio de Janeiro',
        age: 'big',
      },
    })

    console.log(pets)

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'bob',
      }),
      expect.objectContaining({
        name: 'toby',
      }),
    ])
    expect(pets).toHaveLength(2)
  })
})
