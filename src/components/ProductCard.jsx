import { useState } from "react";
import StarRating from "./StarRating";
import ProductModal from "./ProductModal";

export default function ProductCard({ product, onAddToCart, delay = 0 }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="product-card fade-in"
        style={{ background: "white", border: "1px solid var(--border)", overflow: "hidden", animationDelay: `${delay}s` }}
      >
        {/* Image */}
        <div style={{ overflow: "hidden", position: "relative", height: 280 }}>
          <img
            className="product-img"
            src={product.img}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {product.badge && (
            <span style={{
              position: "absolute", top: 12, left: 12,
              background: "var(--deep)", color: "var(--gold-pale)",
              fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5,
              textTransform: "uppercase", padding: "4px 10px",
            }}>
              {product.badge}
            </span>
          )}
          {product.certified && (
            <span style={{
              position: "absolute", top: 12, right: 12,
              background: "var(--gold)", color: "var(--deep)",
              fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1, padding: "4px 8px",
            }}>✦ GI</span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px" }}>
          <p style={{ fontFamily: "var(--body)", fontSize: 10, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            {product.weave} · {product.region}
          </p>
          <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--deep)", lineHeight: 1.2, marginBottom: 4 }}>
            {product.name}
          </h3>
          <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>
            by {product.artisan}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <StarRating rating={product.rating} />
            <span style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>({product.reviews})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--deep)", fontStyle: "italic" }}>
                ₹{product.price.toLocaleString()}
              </p>
              <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>${product.usd} USD</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowModal(true)} className="btn-outline" style={{ padding: "8px 14px", fontSize: 11 }}>
                Details
              </button>
              <button onClick={() => onAddToCart(product, 1)} className="btn-primary" style={{ padding: "8px 14px", fontSize: 11 }}>
                + Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
