import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { paginationCss } from './styles';
import type { PaginationProps } from './type';
import { getPaginationElements } from './utils';

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [compact, setCompact] = useState(false);

  const COMPACT_BREAKPOINT = 360;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setCompact(width < COMPACT_BREAKPOINT);
      }
    });

    ro.observe(el);

    setCompact(el.getBoundingClientRect().width < COMPACT_BREAKPOINT);

    return () => ro.disconnect();
  }, []);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div ref={containerRef}>
      <div css={paginationCss.buttonContainer}>
        <button
          aria-label="previous page"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          css={paginationCss.button}
        >
          <ChevronLeft size={24} />
        </button>

        {compact ? (
          <div css={paginationCss.compactCenter}>
            <button
              onClick={() => onPageChange(1)}
              css={paginationCss.compactJump}
              aria-label="Go to first page"
            >
              {currentPage}
            </button>
            <span css={paginationCss.compactSeparator}>/</span>
            <span css={paginationCss.compactTotal}>{totalPages}</span>
          </div>
        ) : (
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
        )}

        <button
          aria-label="next page"
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
