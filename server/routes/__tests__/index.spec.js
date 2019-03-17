'use-strict';

const request = require('supertest');
const app = require('../index');

//test values
const query = '{airports{name}}'

describe('Airports endpoint validation', () => {
    test('Getting the list', async () => {
      const response = await request(app).get(`/airports?query=${query}`)
      expect(response.statusCode).toBe(200)
      expect(response.text).toEqual(query)
    })
  });