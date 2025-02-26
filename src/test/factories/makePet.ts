import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  organizationId?: string
  age?: number
  size?: string
  energy?: string
  environment?: string
  independent?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    organization_id: overwrite?.organizationId ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int({ max: 20 }),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy:
      overwrite?.energy ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
    independent:
      overwrite?.independent ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
  }
}
