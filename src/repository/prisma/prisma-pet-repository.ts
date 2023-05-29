import { FilterData } from '@/utils/interface-filterData'
import { Prisma, Pet } from '@prisma/client'
import { PetRepository } from '../main/petRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async featureFilter(data: FilterData): Promise<Pet[]> {
    const { city, age, independence, habitat } = data

    const pets = await prisma.pet.findMany({
      where: {
        city,
        age: age ? { equals: age } : undefined,
        independence: independence ? { equals: independence } : undefined,
        habitat: habitat ? { equals: habitat } : undefined,
      },
    })

    return pets
  }

  async profilePet(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
