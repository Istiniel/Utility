import React from 'react';
import st from './Pagination.module.scss';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (page: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={st.container}>
      <ul className={st.pages}>
        {pageNumbers.map((page) => (
          <li key={page} className={st.page + (currentPage === page ? ` ${st.active}` : '')}>
            <a onClick={() => paginate(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
