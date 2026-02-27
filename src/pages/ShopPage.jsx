import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, REGIONS } from "../data/data";

export default function ShopPage({ onAddToCart, products }) {
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All Regions");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.weave.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== "All Regions" && !p.region.includes(region)) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ padding: "48px 64px" }}>
      <p className="section-label" style={{ marginBottom: 6 }}>Our Collection</p>
      <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 48px)", color: "var(--deep)", fontWeight: 300, marginBottom: 36 }}>
        All Handloom Products
      </h1>

      {/* Filters Row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <input
            placeholder="Search weaves, products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ width: "auto", minWidth: 160 }}>
          {REGIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "auto", minWidth: 160 }}>
          <option value="featured">Featured</option>
          <option value="rating">Top Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)" }}>{filtered.length} products</span>
      </div>

      {/* Category Pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} style={{
            padding: "7px 18px",
            border: `1.5px solid ${category === c ? "var(--deep)" : "var(--border)"}`,
            background: category === c ? "var(--deep)" : "transparent",
            color: category === c ? "var(--cream)" : "var(--muted)",
            fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5,
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} delay={i * 0.05} />)}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontFamily: "var(--display)", fontSize: 28, color: "var(--muted)", fontStyle: "italic" }}>No products found</p>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)", marginTop: 8 }}>Try a different filter or search term.</p>
        </div>
      )}
    </div>
  );
}
