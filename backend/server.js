import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import CartItem from "./models/CartItem.js"
import User from "./models/User.js"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/shoeshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err))

app.post("/api/cart", async (req, res) => {
  try {
    const newItem = new CartItem(req.body)
    await newItem.save()
    res.status(201).json(newItem)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/cart", async (req, res) => {
  try {
    const items = await CartItem.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await CartItem.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: "Item not found" })
    res.json({ message: "Item deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" })
    }
    const newUser = new User({ username, password })
    await newUser.save()
    res.status(201).json({ message: "Signup successful" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, password })
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" })
    }
    res.json({ message: "Login successful", username: user.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/checkout", async (req, res) => {
  try {
    const items = await CartItem.find()
    if (items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subtotal * 0.18
    const total = subtotal + tax

    const bill = {
      items: items.map((i) => ({
        name: i.name,
        size: i.size || "N/A",
        price: i.price,
        quantity: i.quantity,
        total: i.price * i.quantity,
      })),
      subtotal,
      tax,
      total,
    }

    res.json(bill)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
