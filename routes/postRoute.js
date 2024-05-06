import express from 'express'
import { tryCatch } from '../middlewares/tryCatch.js'
import { createPost } from '../controllers/post/postController.js'
import verifytoken from '../middlewares/verifyToke.js'
const Router = express.Router()

Router.get('/api/post',verifytoken, tryCatch(createPost))

export default Router