import express from 'express'
import { tryCatch } from '../middlewares/tryCatch.js'
import { checkLike, createPost, getFeed, getPosts, likeUnlike } from '../controllers/post/postController.js'
import verifytoken from '../middlewares/verifyToke.js'
import fileUpload, { upload } from '../middlewares/imageUpload.js'
const Router = express.Router()

Router.post('/api/post',verifytoken,upload.single('image'),fileUpload, tryCatch(createPost))
.get('/api/post', tryCatch(getPosts))
.get('/api/feed-post',verifytoken, tryCatch(getFeed))
.post('/api/like-unlike/:id', verifytoken , tryCatch(likeUnlike))
.post('/api/like-state/:id', verifytoken , tryCatch(checkLike))

 

export default Router 