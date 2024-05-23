
import express from 'express'
import { tryCatch } from '../middlewares/tryCatch.js'
import { checkFollow, followUnfollow, getAllUsers, getLogindUser, getUserProfile } from '../controllers/user/userController.js'
import verifytoken from '../middlewares/verifyToke.js'
const Router = express.Router()

Router.get("/api/userprofile/:username", verifytoken, tryCatch(getUserProfile))
Router.get("/api/currentuser", verifytoken, tryCatch(getLogindUser))
Router.get("/api/allusers", verifytoken, tryCatch(getAllUsers))
Router.post('/api/follow-unfollow/:username', verifytoken ,tryCatch(followUnfollow))
Router.get('/api/follow-state/:username',verifytoken, tryCatch(checkFollow))
// app.get('',

export default Router