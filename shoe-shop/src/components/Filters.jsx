export default function Filters({ categories, selected, onChange }) {
  const { category, maxPrice, sizes, colors, query } = selected

  const update = (patch) => onChange({ ...selected, ...patch })
  const toggleIn = (key, value) => {
    const set = new Set(selected[key])
    set.has(value) ? set.delete(value) : set.add(value)
    update({ [key]: [...set] })
  }

  return (
    <div className="filters" role="region" aria-label="Product filters">
      <div className="field">
        <label htmlFor="q">Search</label>
        <input id="q" className="input" type="search" placeholder="Search shoes" value={query}
          onChange={(e) => update({ query: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" className="select" value={category} onChange={(e) => update({ category: e.target.value })}>
          <option value="">All</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="price">Max Price: ${maxPrice}</label>
        <input id="price" className="range" type="range" min="30" max="300" step="10" value={maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })} />
      </div>
      <div className="field">
        <label>Sizes</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[6,7,8,9,10,11,12].map(s => (
            <button key={s} type="button" className={`btn ${sizes.includes(s) ? '' : 'btn-ghost'}`} onClick={() => toggleIn('sizes', s)} aria-pressed={sizes.includes(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="field" style={{ gridColumn: 'span 4' }}>
        <label>Colors</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['black','white','red','blue','green','gray','yellow'].map(color => (
            <button key={color} type="button" className={`btn ${colors.includes(color) ? '' : 'btn-ghost'}`} onClick={() => toggleIn('colors', color)} aria-pressed={colors.includes(color)}>
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}