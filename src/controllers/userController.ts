import bcrypt from 'bcryptjs'
import express from 'express'
import { validationResult } from 'express-validator'
import UserModel from '../models/userModel.ts'
import { generateToken } from '../helpers/generateToken.ts'
import { RequestWithBody } from '../interfaces/commonTypes.ts'
import { ILoginData, IRegisterData} from '../interfaces/userInteface.ts'

const UserController = {
  register: async (req: RequestWithBody<IRegisterData>, res: express.Response) => {
    const { email, password, name } = req.body

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Register data error.',
        })
      }

      const existingUser = await UserModel.findOne({ email })

      if (existingUser) {
        return res.status(400).json({ error: 'User with such email already exist' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await UserModel.create({
        name,
        email,
        password: hashedPassword,
      })

      res.status(201).json({ message: 'success' })
    } catch (error) {
      console.error('Error in register:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  login: async (req: RequestWithBody<ILoginData>, res: express.Response) => {
    const { email, password } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Login data error.',
        })
      }
      
      const user = await UserModel.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: 'Incorrect password or login!' })
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        return res.status(400).json({ error: 'Incorrect password or login!' })
      }

      const token = generateToken(user._id)

      res.json({
        email: user.email,
        name: user.name,
        token,
      })
    } catch (error) {
      console.error('Error in login:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
  current: async (req: express.Request, res: express.Response) => {
    //@ts-ignore
    const { id } = req.user

    try {
      const user = await UserModel.findById(id)

      if (!user) {
        return res.status(400).json({ error: 'User not found!' })
      }

      return res.status(200).json({ name: user.name, email: user.email })
    } catch (error) {
      console.log('err', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}

export default UserController
