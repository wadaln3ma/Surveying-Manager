import { expect, describe, it } from 'vitest'
import request from 'supertest'
import app from '../app'

describe('Points routes', ()=>{

  describe('POST / -->', ()=>{

    describe('Given an empty request body', ()=>{
      it('should return 422', ()=>{
        return request(app).post('/api/v1/points/')
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false,
              })
            )
          })
      })
    })

    describe('Given a request body that doesn\'t contain a name property', ()=>{
      it('should return 422', ()=>{
        return request(app).post('/api/v1/points/')
          .send({
            longitude: '123',
            latitude: '123',
            remarks: 'any',
            taskName: 'task'
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false,
              })
            )
          })
      })
    })

    describe('Given a request body that doesn\'t contain a longitude property', ()=>{
      it('should return 422', ()=>{
        return request(app).post('/api/v1/points/')
          .send({
            name: 'point',
            latitude: '123',
            remarks: 'any',
            taskName: 'task'
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false,
              })
            )
          })
      })
    })


    describe('Given a request body that doesn\'t contain a task name property', ()=>{
      it('should return 422', ()=>{
        return request(app).post('/api/v1/points/')
          .send({
            name: 'point',
            longitude: '123',
            latitude: '123',
            remarks: 'any',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false,
              })
            )
          })
      })
    })


  })

  describe('PATCH /:id -->', ()=>{

    describe('Given an empty request body', ()=>{
      it('should return 422', ()=>{
        return request(app).patch('/api/v1/points/1')
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false,
              })
            )
          })
      })
    })

  })

})
