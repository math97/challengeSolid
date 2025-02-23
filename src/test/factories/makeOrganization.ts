import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string
}

export function makeOrganizationHashed(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    email: faker.internet.email(),
    password_hash: overwrite?.password ?? faker.internet.password(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    whatsapp: faker.phone.number(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
    state: faker.location.state(),
    description: faker.lorem.sentence(),
  }
}

export function makeOrganization(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    email: faker.internet.email(),
    password: overwrite?.password ?? faker.internet.password(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    whatsapp: faker.phone.number(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
    state: faker.location.state(),
    description: faker.lorem.sentence(),
  }
}
