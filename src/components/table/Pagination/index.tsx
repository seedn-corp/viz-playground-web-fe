import { paginationCss } from './styles';
import type { PaginationProps } from './type';

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div css={paginationCss.container}>
      <div css={paginationCss.buttonContainer}>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          css={paginationCss.button}
        >
          이전
        </button>

        <div css={paginationCss.numberButtonContainer}>
          {pages.map((page) => (
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
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          css={paginationCss.button}
        >
          다음
        </button>
      </div>
    </div>
  );
};
