import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connection from './config/db.js'
import authRouter from './routes/authRoute.js'
import postRouter from './routes/postRoute.js'
import userRouter from './routes/userRoute.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swag.cjs'
import errorHandler from './middlewares/errorHandler.js'



const app =  express()
connection()
app.use(express.json())
app.use(cors())
app.use(errorHandler);
app.use(authRouter,postRouter,userRouter)
app.use('/api/docs/',swaggerUi.serve , swaggerUi.setup(swaggerDoc))





 

app.listen(process.env.PORT, () => {
    console.log(`server running on port http://localhost:${process.env.PORT}`)
}) 