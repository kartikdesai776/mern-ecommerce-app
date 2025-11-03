import { useEffect, useState } from "react"

export default function Checkout() {
  const [bill, setBill] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/checkout")
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setError(data.message)
        else setBill(data)
      })
      .catch(() => setError("Failed to load bill"))
  }, [])

  if (error) return <p>{error}</p>
  if (!bill) return <p>Loading bill...</p>

  return (
    <div className="checkout-container">
      <h1>Billing Summary</h1>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-summary">
        <p>Subtotal: ₹{bill.subtotal.toFixed(2)}</p>
        <p>Tax (18%): ₹{bill.tax.toFixed(2)}</p>
        <h2>Grand Total: ₹{bill.total.toFixed(2)}</h2>
      </div>
    </div>
  )
}
