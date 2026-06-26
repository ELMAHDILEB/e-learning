import { useState } from "react";

const usePagination = (data, perPage = 5) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const paginated = data.slice((page - 1) * perPage, page * perPage);

  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const resetPage = () => setPage(1);

  return { page, totalPages, paginated, prevPage, nextPage, resetPage };
};

export default usePagination;