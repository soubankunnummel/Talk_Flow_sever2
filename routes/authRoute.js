import express from 'express'
import { tryCatch } from '../middlewares/tryCatch.js'
import { login, SignUp } from '../controllers/auth/authController.js'

import cron from 'node-cron'

const Router = express.Router()

Router.post('/api/signup', tryCatch(SignUp))
Router.post("/api/login",tryCatch(login))


cron.schedule('*/5 * * * * *', () => {
    console.log('Running a task every minute');
  });
  


export default Router    