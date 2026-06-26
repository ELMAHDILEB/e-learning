import { useState, useMemo } from "react";

const useSearch = (data, keys) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    data.filter((item) =>
      keys.some((key) =>
        item[key]?.toLowerCase().includes(search.toLowerCase())
      )
    ), [data, search, keys]);

  return { search, setSearch, filtered };
};

export default useSearch;