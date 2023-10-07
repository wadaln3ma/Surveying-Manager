import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

describe("Tasks routes", ()=>{

  describe("POST / -->", ()=>{
    describe("Given an empty request body", ()=>{
      it("Returns return an error", ()=>{
        return request(app).post('/api/v1/tasks')
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false
              })
            )
          })
      })
    })

    describe("Given a request body that doesn\'t contain a name property", ()=>{
      it("Returns return an error", ()=>{
        return request(app).post('/api/v1/tasks')
          .send({
            descriotion: 'some description',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false
              })
            )
          })
      })
    })

  })

  describe("PATCH /:id -->", ()=>{
    describe("Given an empty request body", ()=>{
      it("Returns return an error", ()=>{
        return request(app).patch('/api/v1/tasks/1')
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false
              })
            )
          })
      })
    })

    describe("Given a request body that doesn\'t contain a name property", ()=>{
      it("Returns return an error", ()=>{
        return request(app).patch('/api/v1/tasks/1')
          .send({
            descriotion: 'some description',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: false
              })
            )
          })
      })
    })

  })


})

