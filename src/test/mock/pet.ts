import { randomUUID } from 'node:crypto'

export const mockPet = async (organizationId: string) => [
  {
    id: randomUUID(),
    name: 'Loki',
    about: 'Friendly and playful',
    age: 2,
    size: 'Medium',
    energy: 'High',
    independent: 'low',
    environment: 'Indoor',
    organization_id: organizationId,
  },
  {
    id: randomUUID(),
    name: 'Fred',
    about: 'Friendly and playful',
    age: 4,
    size: 'small',
    energy: 'small',
    independent: 'high',
    environment: 'outdoor',
    organization_id: organizationId,
  },
]
