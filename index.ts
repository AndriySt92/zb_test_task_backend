import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/db/connectDb.ts'
import userRouter from './src/routes/userRouter.ts'
import dealsRouter from './src/routes/dealsRouter.ts'

const app = express()
dotenv.config()
connectDB()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRouter)
app.use('/api/deals', dealsRouter)

app.get('/', (req, res) => {
  res.status(200).json({message: 'Work'})
})

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})
