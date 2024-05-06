import express from 'express'
import { tryCatch } from '../middlewares/tryCatch.js'
import { login, SignUp } from '../controllers/auth/authController.js'

const Router = express.Router()

Router.post('/api/signup', tryCatch(SignUp))
Router.post("/api/login",tryCatch(login))

export default Router