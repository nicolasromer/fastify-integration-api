'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('can fetch a course', async (t) => {
  const app = await build(t)

  // todo: mock data
  const res = await app.inject({
    url: '/api/lepaya-courses/ef131a0c-3006-4a38-8cfd-085fa08f8361'
  })

  t.equal(
    res.payload, 
    JSON.stringify({
      "id": "ef131a0c-3006-4a38-8cfd-085fa08f8361",
      "title": "Business-focused bifurcated secured line",
      "date": "2073-01-18T06:57:06.870Z",
      "trainer": {
        "id": "d2b16518-cb01-42b1-970a-a5337dffc155",
        "name": "Miss Linda Conroy"
      },
      "learners": [
        {
          "id": "d7aaf22e-d82f-448e-bc09-a6072e788b20",
          "name": "Manuel Casper"
        },
        {
          "id": "e9c7a7cd-33d5-4007-a6a4-11e9c208eb76",
          "name": "Kathleen Conroy"
        },
        {
          "id": "b98509fc-a393-4e43-9bf3-32f506ec7fa0",
          "name": "Mrs. Johanna Lebsack"
        },
        {
          "id": "8ec62b73-d69d-43eb-b3c9-3b71aad259de",
          "name": "Patrick Mills"
        },
        {
          "id": "3988158d-7309-46c1-bec1-8cb21b50f7b4",
          "name": "Rudy Walker"
        },
        {
          "id": "a259bc34-01c8-4452-89a1-66a36a01cc7b",
          "name": "Ernesto Wiza"
        }
      ]
    })
  )
})

// tests todo:
// 404
// 500
// no learners
// no trainer
// one or more timeouts