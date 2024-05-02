import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import UserModel from '../models/userModel.js'
import { generateToken } from '../helpers/generateToken.js'

const UserController = {
  register: async (req, res) => {
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
  login: async (req, res) => {
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
  current: async (req, res) => {
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
