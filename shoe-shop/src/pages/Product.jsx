import { useState, useEffect } from 'react';

export default function Product({ id, initialProducts, addToCart }) {
  const [products, setProducts] = useState(initialProducts);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const found = products.find(p => String(p.id) === String(id));
    setProduct(found);
    setSize(found?.sizes?.[0] || '');
  }, [id, products]);

  if (!product) return <p>Product not found.</p>;

  // Example function to update qty of the product in products list (demonstrating list+object update)
  const updateProductQtyInList = (newQty) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, qty: newQty } : p
      )
    );
    setQty(newQty);
  };

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <img src={product.images?.[0] || product.image} alt={`${product.name} main image`} />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {(product.images || []).slice(1).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${product.name} alternate ${i + 1}`}
              style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8 }}
            />
          ))}
        </div>
      </div>
      <div className="product-actions">
        <h1>{product.name}</h1>
        <p className="card-subtle">{product.category}</p>
        <h2>{formatCurrency(product.price)}</h2>
        <p>{product.description}</p>

        <div className="form-row">
          <label>
            <div>Size</div>
            <select className="select" value={size} onChange={e => setSize(e.target.value)}>
              {product.sizes?.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            <div>Quantity</div>
            <input
              className="input"
              type="number"
              min="1"
              max="10"
              value={qty}
              onChange={e => updateProductQtyInList(Number(e.target.value))}
            />
          </label>
        </div>

        <button
          className="btn"
          onClick={() => addToCart(product, qty, size)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>

        <section style={{ marginTop: 16 }}>
          <h3>Reviews</h3>
          <p className="card-subtle">★★★★☆ 4.2/5 (128 reviews)</p>
        </section>
      </div>
    </div>
  );
}
