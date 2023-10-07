import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

describe('Users Routes', ()=>{
  describe('POST /signup -->', ()=>{
    describe('Given an empty request body', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
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

    describe('Given request body doesn\'t contain name property', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
          .send({
            email: 'jane.doe@gmail.com',
            password: 'Pass123!@12',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: expect.any(Boolean),
              })
            )
          })
      })
    })

    describe('Given request body doesn\'t contain a valid name', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
          .send({
            name: 'a',
            email: 'jane.doe@gmail.com',
            password: 'Pass123!@12',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: expect.any(Boolean),
              })
            )
          })
      })
    })


    describe('Given request body doesn\'t contain email property', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
          .send({
            name: 'jane doe',
            password: 'Pass123!@12',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: expect.any(Boolean),
              })
            )
          })
      })
    })

    describe('Given request body doesn\'t contain a valid email', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
          .send({
            name: 'jane doe',
            email: 'jane.doegmail.com',
            password: 'Pass123!@12',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: expect.any(Boolean),
              })
            )
          })
      })
    })

    describe('Given request body doesn\'t contain password property', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
          .send({
            name: 'jane doe',
            email: 'jane.doe@gmail.com',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: expect.any(Boolean),
              })
            )
          })
      })
    })

    describe('Given request body doesn\'t contain a valid password', ()=>{
      it('should return an error', ()=>{
        return request(app).post('/api/v1/users/signup')
          .send({
            name: 'jane doe',
            email: 'jane.doe@gmail.com',
            password: '123',
          })
          .expect(422)
          .expect('Content-Type', /json/)
          .then(res =>{
            expect(res.body).toEqual(
              expect.objectContaining({
                message: expect.any(String),
                success: expect.any(Boolean),
              })
            )
          })
      })
    })


  })
})
