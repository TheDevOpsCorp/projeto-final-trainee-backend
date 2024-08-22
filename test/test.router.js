import express from 'express'
import auth_middleware from '../src/middlewares/auth_middleware.js'

let test_app = express()
test_app.use(express.json())

test_app.post('/test/middlware/autenticaçao', auth_middleware.authenticatJWT,(req,res)=>{
   // @ts-ignore
   res.json(req.user)
})

export default test_app

