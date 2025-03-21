import { test } from 'node:test'
import assert from 'assert'

import { buildServer } from './app'

test('GET / returns welcome message', async () => {
  const server = await buildServer()

  const response = await server.inject({
    method: 'GET',
    url: '/',
  })

  assert.strictEqual(response.statusCode, 200)
  const body = JSON.parse(response.payload)

  assert.strictEqual(body.message, 'Welcome to the PDF Generator API')
})
