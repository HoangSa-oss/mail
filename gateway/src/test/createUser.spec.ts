import { query } from "express"
import request from "supertest"
import app from '../app'
it('create user success',async()=>{
    const queryData = {
        query: `
        mutation Mutation($input: CreateUserInput) {
          createUser(input: $input) {
            message
            data {
              _id
              createAt
              createBy
              email
              firstName
            }
            status
          }
        }
        `,
        variables:{
          "input": {
            "username": "concac123",
            "password": "123321",
            "email": "conc1d23ac@gmail.com",
            "permission": "123"
          },
        }
    } 
    await request(app).post('/graphql').send(queryData).expect(200)
})
it('create user already used',async()=>{
  const queryData = {
      query: `
      mutation Mutation($input: CreateUserInput) {
        createUser(input: $input) {
          message
          data {
            _id
            createAt
            createBy
            email
            firstName
          }
          status
        }
      }
      `,
      variables:{
        "input": {
          "username": "concac123",
          "password": "123321",
          "email": "conc1d23ac@gmail.com",
          "permission": "123"
        },
      }
  } 
  await request(app).post('/graphql').send(queryData).expect(200)
  const response = await request(app).post('/graphql').send(queryData)
  expect(response.body.errors[0].message).toBe('Username or Email already used')
})