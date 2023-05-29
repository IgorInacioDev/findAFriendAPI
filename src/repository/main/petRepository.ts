import { FilterData } from '@/utils/interface-filterData'
import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  featureFilter(data: FilterData): Promise<Pet[]>
  profilePet(id: string): Promise<Pet | null>
}
