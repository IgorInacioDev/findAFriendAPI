import { randomUUID } from 'crypto'
import { PetRepository } from '../main/petRepository'
import { Pet, Prisma } from '@prisma/client'
import { FilterData } from '@/utils/interface-filterData'

export class PetInMemoryRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      age: data.age,
      habitat: data.habitat,
      org_id: data.org_id,
      city: data.city,
      register_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      independence: data.independence,
    }

    this.items.push(pet)

    return pet
  }

  async featureFilter(data: FilterData): Promise<Pet[]> {
    const { age, independence, habitat, city } = data

    if (!city) {
      throw new Error('City is required')
    }

    const filteredPets = this.items.filter((pet) => {
      return (
        (!city || pet.city === city) &&
        (!age || pet.age === age) &&
        (!independence || pet.independence === independence) &&
        (!habitat || pet.habitat === habitat)
      )
    })

    return filteredPets
  }

  async profilePet(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
