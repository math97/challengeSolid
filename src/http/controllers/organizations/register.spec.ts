import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from '@/test/factories/makeOrganization'

describe('Register Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server)
      .post('/organization')
      .send(makeOrganization())

    expect(response.status).toBe(201)
  })
})
