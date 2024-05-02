import DealsModel from '../models/dealsModel.js'

const DealsController = {
  getAll: async (req, res) => {
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