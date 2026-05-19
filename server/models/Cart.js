import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
)

export const Cart = mongoose.model('Cart', cartSchema)
