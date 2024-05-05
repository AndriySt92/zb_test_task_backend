import exporess from 'express'
import DealsModel from '../models/dealsModel.ts'

const DealsController = {
  getAll: async (req: exporess.Request, res: exporess.Response) => {
    try {
      const deals = await DealsModel.find().sort('-createdAt')

      res.json(deals)
    } catch (error) {
      console.error('Error in get all deals:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}

export default DealsController