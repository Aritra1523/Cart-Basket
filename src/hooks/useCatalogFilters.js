import { useState, useMemo } from "react";
import { PRODUCTS } from "../data/products.js";

export function useCatalogFilters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none"); 

  const visibleProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [search, category, sort]);

  return { search, setSearch, category, setCategory, sort, setSort, visibleProducts };
}
