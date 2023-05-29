import { randomUUID } from 'crypto'
import { OrgRepository } from '../main/orgRepository'
import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

export class OrgInMemoryRepository implements OrgRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      zip_code: new Decimal(data.zip_code.toString()),
      number: new Decimal(data.number.toString()),
      address: data.address,
      city: data.city,
      created_at: new Date(),
      role: data.role ?? 'ORG',
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
