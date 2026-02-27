export default function Footer() {
  return (
    <footer style={{ background: "var(--deep)", padding: "64px", borderTop: "1px solid #2e1e08" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 22 }}>🪡</span>
            <span style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--cream)", letterSpacing: 1 }}>HeritageLoom</span>
          </div>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "rgba(250,247,242,0.5)", lineHeight: 1.9, maxWidth: 300 }}>
            Bridging the gap between India's master weavers and global buyers who appreciate authentic handloom craftsmanship.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
            {["Instagram", "Pinterest", "X", "YouTube"].map((s) => (
              <span key={s} style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--gold)", letterSpacing: 1, cursor: "pointer", textTransform: "uppercase" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {[
          { title: "Shop",     links: ["New Arrivals", "Sarees", "Dupattas", "Stoles", "Shawls", "Gift Cards"] },
          { title: "Artisans", links: ["Join as Artisan", "Artisan Stories", "GI Certification", "Payout Info"] },
          { title: "Support",  links: ["Track Order", "Returns", "FAQs", "Shipping Info", "Contact Us"] },
        ].map((col) => (
          <div key={col.title}>
            <p style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 2.5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 18 }}>
              {col.title}
            </p>
            {col.links.map((l) => (
              <p
                key={l}
                style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(250,247,242,0.5)", marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold-light)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(250,247,242,0.5)")}
              >
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid #2e1e08", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "rgba(250,247,242,0.35)" }}>
          © 2025 HeritageLoom. All rights reserved. Celebrating India's handloom heritage.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms of Service", "Accessibility"].map((t) => (
            <span key={t} style={{ fontFamily: "var(--body)", fontSize: 11, color: "rgba(250,247,242,0.35)", cursor: "pointer" }}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
