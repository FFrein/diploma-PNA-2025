import React from "react";

interface PaginatorProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalAnimals: number;
  pageSize?: number;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  onPageChange,
  totalAnimals,
  pageSize = 3,
}) => {
  console.log(currentPage, totalAnimals, pageSize);

  const totalPages = Math.ceil(totalAnimals / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const maxDisplayedPages = 5; // Максимум 5 кнопок страниц
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxDisplayedPages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    // Корректируем startPage, если endPage меньше maxDisplayedPages
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const canGoBack = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav className="paginator" aria-label="Pagination">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoBack}
        className={`paginator-button ${!canGoBack ? "disabled" : ""}`}
      >
        Назад
      </button>

      {/* Номера страниц */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`paginator-button ${page === currentPage ? "active" : ""}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Кнопка "Вперед" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`paginator-button ${!canGoNext ? "disabled" : ""}`}
      >
        Вперед
      </button>
    </nav>
  );
};

export default Paginator;
