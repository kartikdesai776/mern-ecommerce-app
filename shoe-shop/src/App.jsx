import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Account from './pages/Account.jsx'
import Contact from './pages/Contact.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import Checkout from "./pages/Checkout.jsx"


<Routes>
  <Route path="/" element={<Home />} />
  {/* other routes */}
</Routes>


export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <div className="app-shell">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ProductsProvider>
  )
}