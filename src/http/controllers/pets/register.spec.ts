import request from 'supertest'

import { app } from '@/app'
import { makeOrganization } from '@/test/factories/makeOrganization'
import { makePet } from '@/test/factories/makePet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const organization = makeOrganization()

    await request(app.server).post('/organization').send(organization)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: organization.email, password: organization.password })

    const response = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ organizationId: organization.id }))

    expect(response.status).toBe(201)
  })
})
