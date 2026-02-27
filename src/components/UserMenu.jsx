import { useState } from "react";
import { ROLE_COLORS, ROLE_ICONS } from "../data/data";

export default function UserMenu({ user, onSignOut }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    user.role === "Buyer" && { icon: "📦", label: "My Orders" },
    user.role === "Buyer" && { icon: "❤️", label: "Wishlist" },
    user.role === "Artisan" && { icon: "🧵", label: "My Products" },
    user.role === "Artisan" && { icon: "💰", label: "Earnings" },
    user.role === "Admin" && { icon: "⚙️", label: "Admin Panel" },
    user.role === "Marketing Specialist" && { icon: "📢", label: "Campaigns" },
    { icon: "👤", label: "Profile Settings" },
  ].filter(Boolean);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "var(--ivory)", border: "1px solid var(--border)",
          padding: "7px 14px", cursor: "pointer", transition: "all 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "var(--deep)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
        }}>
          {ROLE_ICONS[user.role]}
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--deep)", fontWeight: 700, lineHeight: 1.2 }}>
            {user.name.split(" ")[0]}
          </p>
          <p style={{ fontFamily: "var(--body)", fontSize: 10, color: ROLE_COLORS[user.role] }}>
            {user.role}
          </p>
        </div>
        <span style={{ color: "var(--muted)", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: "var(--cream)", border: "1px solid var(--border)",
          minWidth: 200, zIndex: 200,
          boxShadow: "0 8px 32px rgba(30,18,8,0.12)",
          animation: "slideUp 0.15s ease",
        }}>
          {/* User Info */}
          <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border)", background: "var(--ivory)" }}>
            <p style={{ fontFamily: "var(--display)", fontSize: 16, color: "var(--deep)" }}>{user.name}</p>
            <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{user.email}</p>
            <span style={{
              display: "inline-block", marginTop: 6,
              background: ROLE_COLORS[user.role], color: "white",
              fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1,
              padding: "2px 10px", textTransform: "uppercase",
            }}>
              {user.role}
            </span>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <div
              key={item.label}
              style={{ padding: "11px 18px", display: "flex", gap: 10, alignItems: "center", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ivory)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setOpen(false)}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--deep)" }}>{item.label}</span>
            </div>
          ))}

          {/* Sign Out */}
          <div
            style={{ borderTop: "1px solid var(--border)", padding: "11px 18px", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ivory)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => { onSignOut(); setOpen(false); }}
          >
            <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--rust)" }}>↩ Sign Out</span>
          </div>
        </div>
      )}
    </div>
  );
}
