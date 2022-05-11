import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

function generateCredentials() {
  const username = faker.internet.userName()
  const email = faker.internet.email()
  const password = faker.internet.password()

  return {
    username,
    email,
    password,
    password_confirmation: password,
  }
}

test.group('users tests', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should return a user if correct data is provided', async ({ client }) => {
    const payload = generateCredentials()
    const response = await client.post('/users').form(payload)

    response.assertStatus(201)
    response.assertBodyContains({ email: payload.email })
  })

  test('should return a 400 status if existing email is provided', async ({ client }) => {
    const createntials = generateCredentials()

    await client.post('/users').form(createntials)

    const payloadTest = {
      email: createntials.email,
      username: 'test_2',
      password: 'test_2',
      password_confirmation: 'test_2',
    }

    const response = await client.post('/users').form(payloadTest)
    response.assertStatus(400)
  })

  test('should return a 400 status if existing username is provided', async ({ client }) => {
    const createntials = generateCredentials()

    await client.post('/users').form(createntials)

    const payloadTest = {
      email: 'test2@test.com',
      username: createntials.username,
      password: 'test_2',
      password_confirmation: 'test_2',
    }

    const response = await client.post('/users').form(payloadTest)
    response.assertStatus(400)
  })

  test('should return a 422 status if existing password does not match with password_confirmation', async ({
    client,
  }) => {
    const createntials = generateCredentials()

    const response = await client.post('/users').form({
      ...createntials,
      password_confirmation: 'test_wrong',
    })

    response.assertStatus(422)
  })

  test('should return a 422 status if provided email does not match with email pattern', async ({
    client,
  }) => {
    const createntials = generateCredentials()

    const response = await client.post('/users').form({
      ...createntials,
      email: 'wrong_email',
    })

    response.assertStatus(422)
  })

  test('should return a 422 status if provided username is not a string', async ({ client }) => {
    const createntials = generateCredentials()

    const response = await client.post('/users').form({
      ...createntials,
      username: [],
    })

    response.assertStatus(422)
  })

  test('should return a 422 status if provided email is not a string or number', async ({
    client,
  }) => {
    const createntials = generateCredentials()

    const response = await client.post('/users').form({
      ...createntials,
      email: [],
    })

    response.assertStatus(422)
  })

  test('should return a 422 status if provided password is not a string or number', async ({
    client,
  }) => {
    const createntials = generateCredentials()

    const response = await client.post('/users').form({
      ...createntials,
      password: [],
      password_confirmation: [],
    })

    response.assertStatus(422)
  })
})
