import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('cart:v1', [])

  // Load cart items from MongoDB when app starts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cart')
        if (res.ok) {
          const data = await res.json()
          setItems(data)
          console.log('🛒 Cart loaded from MongoDB')
        }
      } catch (err) {
        console.error('❌ Error fetching cart from backend:', err)
      }
    }
    fetchCart()
  }, [])

  // Add to cart + save to MongoDB
  const addToCart = async (product, qty = 1, size) => {
    const key = `${product.id}-${size ?? 'na'}`

    const newItem = {
      key,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      qty,
      size,
    }

    setItems(prev => {
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: Math.min(99, i.qty + qty) } : i)
      } else {
        return [...prev, newItem]
      }
    })

    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
      if (!res.ok) throw new Error('Failed to save item to MongoDB')

      const savedItem = await res.json()
      // update the saved _id in frontend
      setItems(prev => prev.map(i => i.key === key ? { ...i, _id: savedItem._id } : i))
      console.log('✅ Item saved to MongoDB')
    } catch (err) {
      console.error('❌ Error saving item:', err)
    }
  }

  // Update quantity both locally and in backend
  const updateQty = async (key, qty) => {
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
    const item = items.find(i => i.key === key)
    if (!item?._id) return console.error('Missing MongoDB ID for this item')

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty }),
      })
      if (!response.ok) throw new Error('Failed to update item in MongoDB')
      console.log('🆙 Quantity updated in MongoDB')
    } catch (err) {
      console.error('❌ Error updating item:', err)
    }
  }

  // Remove from cart both locally and in backend
  const removeFromCart = async (key) => {
    const item = items.find(i => i.key === key)
    if (!item?._id) {
      setItems(prev => prev.filter(i => i.key !== key))
      return
    }

    setItems(prev => prev.filter(i => i.key !== key))
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${item._id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item in MongoDB')
      console.log('🗑️ Item removed from MongoDB')
    } catch (err) {
      console.error('❌ Error deleting item:', err)
    }
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = { items, addToCart, updateQty, removeFromCart, subtotal, totalItems }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
