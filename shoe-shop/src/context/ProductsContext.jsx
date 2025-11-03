import { createContext, useContext, useMemo } from 'react'
import productsData from '../data/products.js'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const categories = useMemo(() => Array.from(new Set(productsData.map(p => p.category))), [])
  const value = { products: productsData, categories }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}