import CatalogControls from "../components/CatalogControls.jsx";
import ProductList from "../components/ProductList.jsx";
import { useCatalogFilters } from "../hooks/useCatalogFilters.js";

export default function HomePage() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    visibleProducts,
  } = useCatalogFilters();

  return (
    <section className="catalog-page">
      <div className="catalog-intro">
        <h2>Today's picks</h2>
        <p>Fresh items, straight into your basket.</p>
      </div>

      <CatalogControls
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      <ProductList products={visibleProducts} />
    </section>
  );
}
