export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const prev = () => onPage(Math.max(1, page - 1))
  const next = () => onPage(Math.min(totalPages, page + 1))

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }} aria-label="Pagination">
      <button className="btn btn-ghost" onClick={prev} disabled={page === 1}>Prev</button>
      <span style={{ alignSelf: 'center' }}>Page {page} / {totalPages}</span>
      <button className="btn btn-ghost" onClick={next} disabled={page === totalPages}>Next</button>
    </div>
  )
}