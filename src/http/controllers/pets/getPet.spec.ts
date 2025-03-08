import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from '@/test/factories/makeOrganization'
import { makePet } from '@/test/factories/makePet'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organization').send(org)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const getPetResponse = await request(app.server)
      .get(`/pet/${response.body.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getPetResponse.status).toBe(200)
  })
})
