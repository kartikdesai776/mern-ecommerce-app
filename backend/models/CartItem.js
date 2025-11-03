import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  key: String,
  id: String,
  name: String,
  price: Number,
  image: String,
  qty: Number,
  size: String,
})

export default mongoose.model('CartItem', cartItemSchema)
