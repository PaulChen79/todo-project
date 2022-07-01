const request = require('supertest')
const app = require('../app')

describe('Todos API', () => {
  it('GET /todos', () => {
    return request(app).get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.ant(Boolean)
          })
        ]))
      })
  })

  it('GET /todo/id', () => {
    return request(app).get('/todos/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.toBe(1),
            name: expect.any(String),
            completed: expect.ant(Boolean)
          })
        )
      })
  })

  it('GET /todo/id not found', () => {
    return request(app).get('/todos/99999').expect(404)
  })

  it('POST /todos', () => {
    return request(app).post('/todos').send({
      name: 'test todo'
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .then(response => {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'test todo',
          completed: false
        })
      )
    })
  })
  
  it('PUT /todo/id', () => {
    return request(app).put('/todos/1').send({
      name: 'test update',
      completed: true
    })
    .expect('Content-Type', /json/)
    .expect(204)
    .then(response => {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          name: 'test update',
          completed: true
        })
      )
    })
  })

  it('DELETE /todo/id not found', () => {
    return request(app).delete('/todos/1')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({})
      })
  })
})