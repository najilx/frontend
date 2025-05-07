export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <ul className="pagination">
      {pages.map(p => (
        <li key={p} className={`page-item${p === page ? ' active' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        </li>
      ))}
    </ul>
  );
}
