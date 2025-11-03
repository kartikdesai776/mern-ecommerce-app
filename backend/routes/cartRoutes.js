import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

// GET all cart items
router.get("/", async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});

// ADD or UPDATE item
router.post("/", async (req, res) => {
  const { key, name, image, price, size, qty } = req.body;
  let existing = await CartItem.findOne({ key });
  if (existing) {
    existing.qty = qty;
    await existing.save();
    return res.json(existing);
  }
  const newItem = new CartItem({ key, name, image, price, size, qty });
  await newItem.save();
  res.json(newItem);
});

// DELETE an item
router.delete("/:key", async (req, res) => {
  await CartItem.findOneAndDelete({ key: req.params.key });
  res.json({ message: "Item removed" });
});

export default router;
