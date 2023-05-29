import { OrgRepository } from '@/repository/main/orgRepository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  password: string
  zip_code: number
  number: number
  address: string
  city: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    number,
    email,
    password,
    zip_code,
    address,
    city,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const org = await this.orgRepository.create({
      name,
      number,
      email,
      password_hash,
      zip_code,
      address,
      city,
    })

    return {
      org,
    }
  }
}
