import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import Filters from '../components/Filters.jsx'
import Pagination from '../components/Pagination.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

const PAGE_SIZE = 12

export default function Browse() {
  const { products, categories } = useProducts()
  const [filters, setFilters] = useState({ category: '', maxPrice: 300, sizes: [], colors: [], query: '' })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return products.filter(p => {
      const inCategory = !filters.category || p.category === filters.category
      const inPrice = p.price <= filters.maxPrice
      const inSizes = filters.sizes.length === 0 || p.sizes?.some(s => filters.sizes.includes(s))
      const inColors = filters.colors.length === 0 || p.colors?.some(c => filters.colors.includes(c))
      const inQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return inCategory && inPrice && inSizes && inColors && inQuery
    })
  }, [products, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <h1>Browse</h1>
      <Filters categories={categories} selected={filters} onChange={(f) => { setPage(1); setFilters(f) }} />

      <div className="grid">
        {pageItems.map(p => (
          <div key={p.id} className="col-3"><ProductCard product={p} /></div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  )
}