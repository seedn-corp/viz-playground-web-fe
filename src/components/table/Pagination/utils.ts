type GetPaginationElementsParams = {
  currentPage: number;
  totalPages: number;
  maxCenter?: number;
};

const MAX_CENTER = 5;

export const getPaginationElements = ({
  currentPage,
  totalPages,
  maxCenter = MAX_CENTER,
}: GetPaginationElementsParams): (number | 'ellipsis')[] => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= maxCenter + 2) {
    return pages;
  }

  let start = currentPage - Math.floor(maxCenter / 2);
  let end = start + maxCenter - 1;

  if (start < 2) {
    start = 2;
    end = start + maxCenter - 1;
  }
  if (end > totalPages - 1) {
    end = totalPages - 1;
    start = end - maxCenter + 1;
  }

  const elems: (number | 'ellipsis')[] = [];
  elems.push(1);
  if (start > 2) elems.push('ellipsis');
  for (let p = start; p <= end; p++) elems.push(p);
  if (end < totalPages - 1) elems.push('ellipsis');
  elems.push(totalPages);

  return elems;
};
