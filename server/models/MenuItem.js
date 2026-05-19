import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const MenuItem = mongoose.model('MenuItem', menuItemSchema)
