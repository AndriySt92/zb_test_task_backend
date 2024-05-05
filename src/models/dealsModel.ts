import mongoose from 'mongoose'

export interface IDealsSchema {
  title: string
  img_url: String
  price: Number
  sold: Number
  ticket: Number
  yield: Number
  days_left:Number
}

const DealsSchema = new mongoose.Schema<IDealsSchema>(
  {
    title: {
      type: String,
    },
    img_url: {
      type: String,
    },
    price: {
      type: Number,
    },
    sold: {
      type: Number,
    },
    ticket: {
      type: Number,
    },
    yield: {
      type: Number,
    },
    days_left: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Deals', DealsSchema)