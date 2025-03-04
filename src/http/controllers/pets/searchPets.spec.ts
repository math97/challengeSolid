import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from '@/test/factories/makeOrganization'
import { makePet } from '@/test/factories/makePet'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = makeOrganization({ city: 'test-1' })

    await request(app.server).post('/organization').send(org)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and age', async () => {
    const org = makeOrganization({ city: 'test-2' })

    await request(app.server).post('/organization').send(org)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 1 }))

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 5 }))

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, age: 1 })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = makeOrganization({ city: 'test-3' })

    await request(app.server).post('/organization').send(org)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'small' }))

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'medium' }))

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'large' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, size: 'small' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy', async () => {
    const org = makeOrganization({ city: 'test-4' })

    await request(app.server).post('/organization').send(org)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy: 'low' }))

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy: 'medium' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city, energy: 'low' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const organization = makeOrganization({ city: 'test-5' })

    await request(app.server).post('/organization').send(organization)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: organization.email, password: organization.password })

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ environment: 'indoor' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ city: organization.city, environment: 'indoor' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and independent', async () => {
    const organization = makeOrganization({ city: 'test-6' })

    await request(app.server).post('/organization').send(organization)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: organization.email, password: organization.password })

    await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ independent: 'indoor' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ city: organization.city, independent: 'indoor' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and all filters', async () => {
    const organization = makeOrganization({ city: 'test-7' })

    await request(app.server).post('/organization').send(organization)

    const authResponse = await request(app.server)
      .post('/organization/session')
      .send({ email: organization.email, password: organization.password })

    const pets = [
      makePet({
        age: 1,
        size: 'small',
        energy: 'low',
        environment: 'indoor',
      }),
      makePet({
        age: 2,
        size: 'medium',
        energy: 'medium',
        environment: 'outdoor',
      }),
      makePet({
        age: 2,
        size: 'medium',
        energy: 'high',
        environment: 'indoor',
      }),
      makePet({
        age: 4,
        size: 'small',
        energy: 'low',
        environment: 'outdoor',
      }),
      makePet({
        age: 5,
        size: 'medium',
        energy: 'medium',
        environment: 'indoor',
      }),
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/pet')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    let response = await request(app.server).get('/pets').query({
      city: organization.city,
      age: 1,
      size: 'small',
      energy: 'low',
      environment: 'indoor',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/pets').query({
      city: organization.city,
      age: 2,
      size: 'medium',
    })

    expect(response.body.pets).toHaveLength(2)
  })
})
