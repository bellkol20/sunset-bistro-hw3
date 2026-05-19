import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'completed', 'cancelled'],
      default: 'pending',
    },
    customerName: { type: String, trim: true, default: 'Guest' },
  },
  { timestamps: true },
)

export const Order = mongoose.model('Order', orderSchema)
