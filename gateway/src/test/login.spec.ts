import { query } from "express"
import request from "supertest"
import app from '../app'
it('test login success',async()=>{
    const queryData = {
        query: `
        query {
            hello {
              status
              message
            }
          }
          `
    } 
    await request(app).post('/graphql').send(queryData).expect(200)
})