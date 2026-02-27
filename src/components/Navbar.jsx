import UserMenu from "./UserMenu";

const NAV_ITEMS = [
  { key: "home",     label: "Home" },
  { key: "shop",     label: "Shop" },
  { key: "artisans", label: "Artisans" },
  { key: "about",    label: "Our Story" },
  { key: "contact",  label: "Contact" },
];

export default function Navbar({ page, onNavigate, cartCount, onCartOpen, user, onSignIn, onSignOut }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(250,247,242,0.96)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border)",
      padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
    }}>
      {/* Logo */}
      <div onClick={() => onNavigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>🪡</span>
        <div>
          <span style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--deep)", letterSpacing: 1 }}>Amma's </span>
          <span style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--gold)", letterSpacing: 1 }}>HandLoom's</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_ITEMS.map((n) => (
          <span
            key={n.key}
            className={`nav-link${page === n.key ? " active" : ""}`}
            onClick={() => onNavigate(n.key)}
          >
            {n.label}
          </span>
        ))}
        {user?.role === "Admin" && (
          <span
            className={`nav-link${page === "admin" ? " active" : ""}`}
            onClick={() => onNavigate("admin")}
            style={{ color: "#9e3d1b", fontWeight: 700 }}
          >
            ⚙️ Admin
          </span>
        )}
        {user?.role === "Marketing Specialist" && (
          <span
            className={`nav-link${page === "marketer" ? " active" : ""}`}
            onClick={() => onNavigate("marketer")}
            style={{ color: "#5c3a7c", fontWeight: 700 }}
          >
            📢 Dashboard
          </span>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {/* Cart */}
        <button
          onClick={onCartOpen}
          style={{
            background: "none", border: "1px solid var(--border)", padding: "8px 16px",
            cursor: "pointer", fontFamily: "var(--body)", fontSize: 12, color: "var(--deep)",
            display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          🛍️ Cart
          {cartCount > 0 && (
            <span style={{
              background: "var(--gold)", color: "var(--deep)",
              borderRadius: "50%", width: 18, height: 18,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
            }}>
              {cartCount}
            </span>
          )}
        </button>

        {/* Auth */}
        {user
          ? <UserMenu user={user} onSignOut={onSignOut} />
          : <button className="btn-primary" style={{ padding: "8px 18px" }} onClick={onSignIn}>Sign In</button>
        }
      </div>
    </nav>
  );
}
