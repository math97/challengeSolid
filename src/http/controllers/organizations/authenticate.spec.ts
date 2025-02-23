import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from '@/test/factories/makeOrganization'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    const organization = makeOrganization()

    await request(app.server).post('/organization').send(organization)

    const response = await request(app.server)
      .post('/organization/session')
      .send({
        email: organization.email,
        password: organization.password,
      })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
