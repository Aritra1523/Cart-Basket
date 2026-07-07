import { CATEGORIES } from "../data/products.js";

export default function CatalogControls({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="controls-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for an item…"
        autoComplete="off"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="control-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="control-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="none">Sort: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
