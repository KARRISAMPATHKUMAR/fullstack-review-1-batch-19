import { useState } from "react";
import StarRating from "./StarRating";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 20,
            background: "none", border: "none", fontSize: 22,
            cursor: "pointer", color: "var(--muted)",
          }}
        >×</button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Image */}
          <div style={{ overflow: "hidden" }}>
            <img
              src={product.img} alt={product.name}
              style={{ width: "100%", height: 280, objectFit: "cover" }}
            />
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="tag" style={{ background: "var(--gold-pale)", borderColor: "var(--gold)", color: "var(--rust)" }}>
                {product.badge}
              </span>
            )}
            <h2 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--deep)", marginTop: 10, lineHeight: 1.2 }}>
              {product.name}
            </h2>
            <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              by {product.artisan} · {product.region}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <StarRating rating={product.rating} />
              <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)" }}>({product.reviews})</span>
            </div>
            <div style={{ marginTop: 16 }}>
              <p style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--gold)", fontStyle: "italic" }}>
                ₹{product.price.toLocaleString()}
              </p>
              <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>${product.usd} USD</p>
            </div>

            {/* Details */}
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Weave", product.weave],
                ["Material", product.material],
                ["Colour", product.color],
                ["In Stock", `${product.stock} pieces`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 10, fontFamily: "var(--body)", fontSize: 12 }}>
                  <span style={{ color: "var(--muted)", minWidth: 64 }}>{k}</span>
                  <span style={{ color: "var(--deep)", fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* GI Badge */}
            {product.certified && (
              <div style={{
                marginTop: 12, background: "var(--ivory)", border: "1px solid var(--border)",
                padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ color: "var(--gold)", fontSize: 16 }}>✦</span>
                <span style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--brown)" }}>
                  GI Tag Certified · Authenticity Guaranteed
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Story */}
        <div style={{ marginTop: 20, padding: "16px 0", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 14, color: "var(--brown)", lineHeight: 1.7 }}>
            "{product.story}"
          </p>
        </div>

        {/* Qty + Add to Cart */}
        <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", border: "1px solid var(--border)" }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{ padding: "8px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>−</button>
            <span style={{ padding: "8px 18px", fontFamily: "var(--body)", fontSize: 14, borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
              {qty}
            </span>
            <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              style={{ padding: "8px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>+</button>
          </div>
          <button
            className="btn-primary"
            style={{ flex: 1 }}
            onClick={() => { onAddToCart(product, qty); onClose(); }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
