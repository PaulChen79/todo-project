const request = require('supertest')
const app = require('../app')
const { StatusCodes } = require('http-status-codes')

describe('Todos API', () => {
  it('GET /todos', () => {
    return request(app).get('/todos')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK)
      .then(response => {
        expect(response.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.any(Number)
          })
        ]))
      })
  })

  it('GET /todo/id', () => {
    return request(app).get('/todos/1')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 1,
            name: expect.any(String),
            completed: expect.any(Number)
          })
        )
      })
  })

  it('GET /todo/id not found', () => {
    return request(app).get('/todos/99999').expect(StatusCodes.NOT_FOUND)
  })

  it('POST /todos', () => {
    return request(app).post('/todos').send({
      name: 'test todo',
      UserId: 1
    })
    .expect('Content-Type', /json/)
    .expect(StatusCodes.CREATED)
    .then(response => {
      console.log(response.body)
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'test todo',
          UserId: 1,
          completed: false
        })
      )
    })
  })

  it('POST /todos validation', () => {
    return request(app).post('/todos').send({
      name: 'test todo'
    })
    .expect('Content-Type', /json/)
    .expect(StatusCodes.NOT_ACCEPTABLE)
    .then(response => {
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'todo already exist'
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
    .expect(StatusCodes.OK)
    .then(response => {
      console.log(response.body)
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          name: 'test update',
          completed: true
        })
      )
    })
  })

  it('DELETE /todo/id', () => {
    return request(app).delete('/todos/1')
    .expect(StatusCodes.OK)
    .then(response => {
      console.log(response.body)
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
    .expect('Content-Type', /json/)
    .expect(StatusCodes.NOT_FOUND)
  })

  it('PUT /todo/id', () => {
    return request(app).put('/todos/1').send({
      name: 'test update',
      completed: true
    })
    .expect(StatusCodes.NOT_FOUND)
  })
})