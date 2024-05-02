import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/db/connectDb.js'
import userRouter from './src/routes/userRouter.js'

const app = express()
dotenv.config()
connectDB()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRouter)

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})
