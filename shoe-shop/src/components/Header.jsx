import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header className="header">
      <nav className="navbar container" aria-label="Primary">
        <Link to="/" className="logo" aria-label="Shoe Shop home">
          <span className="logo-badge" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3 15c7 3 11-4 18-1v4c0 1.657-1.343 3-3 3H8c-2.761 0-5-2.239-5-5v-1Z" fill="currentColor"/>
              <path d="M4 11c2-1 3-3 5-5 1.5-1.5 4-2 6 0 2 2 4 4 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          Shoe Shop
        </Link>
        <div className="nav-links">
          <NavLink className="nav-link" to="/" end>Home</NavLink>
          <NavLink className="nav-link" to="/browse">Browse</NavLink>
          <NavLink className="nav-link" to="/account">Account</NavLink>
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
          <NavLink className="nav-link cart-chip" to="/cart" aria-label={`Cart with ${totalItems} items`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M6 6h15l-2 8H7L6 6Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="20" r="1.8" fill="currentColor"/>
              <circle cx="18" cy="20" r="1.8" fill="currentColor"/>
            </svg>
            <span>{totalItems}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}