import mongoose from 'mongoose'

const DealsSchema = new mongoose.Schema(
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