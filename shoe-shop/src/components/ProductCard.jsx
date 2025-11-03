import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/money.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const primary = product.images?.[0] || product.image

  return (
    <article className="card" aria-label={product.name}>
      <Link to={`/product/${product.id}`} aria-label={`Open ${product.name} details`}>
        <img src={primary} alt={`${product.name} shoe in ${product.colors?.[0] || 'default'} color`} />
      </Link>
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="card-subtle">{product.category}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <strong>{formatCurrency(product.price)}</strong>
          <button className="btn" onClick={() => addToCart(product, 1)} aria-label={`Add ${product.name} to cart`}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}