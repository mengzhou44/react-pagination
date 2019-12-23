import React, { useState,  Fragment } from 'react';
import styles from './pagination.module.scss';

export default function Pagination({
  items,
  onChangePage,
  initialPage = 1,
  pageSize = 10
}) {
  const [paginator, setPaginator] = useState(
    getPaginator(items, initialPage, pageSize)
  );

  function setPage(page) {
    if (page > 0 && page <= paginator.totalPages) {
      const newPaginator = getPaginator(items, page, pageSize);

      setPaginator(newPaginator);
      onChangePage(newPaginator.pageItems);
    }
  }

  if (!paginator.pages || paginator.pages.length <= 1) {
    return <Fragment />;
  }

  return (
    <ul className={styles.pagination}>
      <li
        className={paginator.currentPage === 1 ? styles.disabled : ''}
        onClick={() => setPage(paginator.currentPage - 1)}
      >
        <span>{'<'}</span>
      </li>
      {paginator.pages.map((page, index) => (
        <li
          key={index}
          onClick={() => setPage(page)}
          className={paginator.currentPage === page ? styles.active : ''}
        >
          <span>{page}</span>
        </li>
      ))}
      <li
        onClick={() => setPage(paginator.currentPage + 1)}
        className={
          paginator.currentPage === paginator.totalPages ? styles.disabled : ''
        }
      >
        <span>{'>'}</span>
      </li>
    </ul>
  );
}

function getPaginator(items, currentPage, pageSize) {
 
  if (items.length === 0) {
         return {}
  }
      
  currentPage = currentPage || 1;
  const totalPages = Math.ceil(items.length / pageSize);

  let startPage, endPage;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, items.length - 1);
  const pages = [...Array(endPage + 1 - startPage).keys()].map(
    i => startPage + i
  );
  const pageItems = items.slice(startIndex, endIndex + 1);

  return {
    currentPage,
    totalPages,
    pages,
    pageItems
  };
}
