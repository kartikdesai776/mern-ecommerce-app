import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <section>
          <h3>About Us</h3>
          <p className="card-subtle">We craft a modern shoe shopping experience — curated designs, fast delivery, and dedicated support. Our mission is to keep you moving, comfortably and confidently.</p>
        </section>
        <section>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="#" aria-label="Privacy Policy">Privacy Policy</a></li>
            <li><a href="#" aria-label="Terms of Service">Terms of Service</a></li>
          </ul>
        </section>
        <section>
          <h4>Follow Us</h4>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#" aria-label="Follow on Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 5.8c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2.1-.7.4-1.5.8-2.3 1-1.4-1.5-3.8-1.6-5.3-.2-1 .9-1.5 2.3-1.2 3.7-3.1-.2-6-1.7-8-4.1-1 1.8-.5 4 1.2 5.2-.6 0-1.1-.2-1.6-.4 0 2 1.4 3.8 3.4 4.2-.6.2-1.2.2-1.8.1.5 1.7 2.1 3 3.9 3.1-1.6 1.3-3.6 2-5.7 2-.4 0-.8 0-1.1-.1 2.1 1.4 4.6 2.2 7.1 2.2 8.6 0 13.3-7.2 13.3-13.3v-.6c.9-.6 1.6-1.3 2.2-2.1Z"/></svg>
            </a>
            <a href="#" aria-label="Follow on Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Zm5.5-.4a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1Z"/></svg>
            </a>
          </div>
        </section>
      </div>
      <div className="container" style={{ paddingTop: 0, paddingBottom: 24 }}>
        <small>© {new Date().getFullYear()} Shoe Shop. All rights reserved.</small>
      </div>
    </footer>
  )
}