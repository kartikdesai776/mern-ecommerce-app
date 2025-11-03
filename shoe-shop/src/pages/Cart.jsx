import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/money.js'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal, totalItems } = useCart()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table" aria-label="Shopping cart items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.key}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                    <div>
                      <div>{item.name}</div>
                      {item.size && (
                        <small className="card-subtle">Size {item.size}</small>
                      )}
                    </div>
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      min="1"
                      max="10"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.key, Number(e.target.value))
                      }
                      style={{ width: 72 }}
                    />
                  </td>
                  <td>{formatCurrency(item.price * item.qty)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.key)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 24,
              alignItems: 'center',
              marginTop: 16,
            }}
          >
            <div>
              <div>
                Items: <strong>{totalItems}</strong>
              </div>
              <div>
                Subtotal: <strong>{formatCurrency(subtotal)}</strong>
              </div>
            </div>
            <button className="btn" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
