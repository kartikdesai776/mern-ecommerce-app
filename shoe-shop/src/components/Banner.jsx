import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div className="banner" role="region" aria-label="Promotions">
      <div className="banner-inner">
        <div className="banner-text">
          <h1>Step into Comfort</h1>
          <p>Discover the latest drops and timeless classics. Save up to 40% on selected styles this week only.</p>
          <Link to="/browse" className="banner-cta">Shop Now</Link>
        </div>
        <div aria-hidden>
          <img className="banner-img" src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" alt="" />
        </div>
      </div>
    </div>
  )
}