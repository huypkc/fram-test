export function Pagination({ page, numOfPages, onPageChange }: any) {
  const pages = new Array(numOfPages).fill(1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${page < 1 && 'disabled'}`}>
          <button className="page-link" aria-label="Previous" onClick={() => page > 0 && onPageChange(page - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pages.map((_, index) =>
          <li className={`page-item ${page === index && 'active'}`} key={index}>
            <button className="page-link" onClick={() => onPageChange(index)}>{index + 1}</button>
          </li>)}
        <li className={`page-item ${(page > numOfPages - 2) && 'disabled'}`}>
          <button className="page-link" aria-label="Next" onClick={() => (page < numOfPages - 1) && onPageChange(page + 1)}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
