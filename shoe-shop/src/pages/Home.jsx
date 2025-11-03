import React, { useEffect } from 'react'
import Banner from '../components/Banner.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

export default function Home() {
  const { products } = useProducts()
  const featured = products.filter(p => p.featured).slice(0, 8)

  useEffect(() => {
    console.log('Home component mounted')
  }, [])

  return (
    <div className="home">
      <Banner />
      <section style={{ marginTop: 24 }}>
        <h2>Featured</h2>
        <div className="grid" style={{ marginTop: 12 }}>
          {featured.map(p => (
            <div key={p.id} className="col-3"><ProductCard product={p} /></div>
          ))}
        </div>
      </section>
    </div>
  )
}
