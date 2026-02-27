export default function CartModal({ cart, onClose, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--muted)" }}
        >×</button>

        <p className="section-label" style={{ marginBottom: 6 }}>Your Cart</p>
        <h2 style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--deep)", marginBottom: 24 }}>
          {cart.length === 0 ? "Your cart is empty" : `${cart.length} Item${cart.length > 1 ? "s" : ""}`}
        </h2>

        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
            <img src={item.img} alt={item.name} style={{ width: 64, height: 64, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--display)", fontSize: 15, color: "var(--deep)" }}>{item.name}</p>
              <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>{item.artisan}</p>
              <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--gold)", marginTop: 4 }}>
                ₹{(item.price * item.qty).toLocaleString()} × {item.qty}
              </p>
            </div>
            <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderTop: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--muted)" }}>Total</span>
              <span style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--deep)", fontStyle: "italic" }}>
                ₹{total.toLocaleString()}
              </span>
            </div>
            <button className="btn-primary" style={{ width: "100%", marginTop: 8 }}>
              Proceed to Checkout
            </button>
            <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 10 }}>
              Secure checkout · Multi-currency · Worldwide shipping
            </p>
          </>
        )}
      </div>
    </div>
  );
}
