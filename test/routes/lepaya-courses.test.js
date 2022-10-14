'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('lepaya-courses root is loaded', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/api/lepaya-courses'
  })
  t.equal(res.payload, 'Lepaya course api')
})