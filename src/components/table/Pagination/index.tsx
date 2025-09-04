import { ChevronLeft, ChevronRight } from 'lucide-react';

import { paginationCss } from './styles';
import type { PaginationProps } from './type';
import { getPaginationElements } from './utils';

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div>
      <div css={paginationCss.buttonContainer}>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          css={paginationCss.button}
        >
          <ChevronLeft size={24} />
        </button>

        <div css={paginationCss.numberButtonContainer}>
          {getPaginationElements({ currentPage, totalPages }).map((e, idx) => {
            if (e === 'ellipsis') {
              return (
                <span key={`e-${idx}`} css={paginationCss.ellipsis}>
                  ...
                </span>
              );
            }

            const page = e as number;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                css={[
                  paginationCss.numberButton,
                  page === currentPage && paginationCss.numberButtonActive,
                ]}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          css={paginationCss.button}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
