import { useState } from "react";
import ProductCard from "../components/ProductCard";
import StarRating from "../components/StarRating";
import { ARTISANS } from "../data/data";

export default function HomePage({ onNavigate, onAddToCart, products }) {
  const featured = products.slice(0, 3);

  return (
    <div>
      
      <section style={{ position: "relative", minHeight: 580, display: "flex", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('https://media.istockphoto.com/id/171135988/photo/handloom.jpg?s=612x612&w=0&k=20&c=lEyIZ5jSblwiSuASN_kv0ZlRYN6gohpz7D9hksqgJLQ=')`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.45)",
        }} />

        <div className="weave-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px", maxWidth: 700 }}>
          <p className="section-label fade-in" style={{ color: "var(--gold-light)", marginBottom: 16 }}>India's Premier Handloom Marketplace</p>
          <h1 className="slide-up" style={{ fontFamily: "var(--display)", fontSize: "clamp(42px, 6vw, 72px)", color: "var(--cream)", fontWeight: 300, lineHeight: 1.1, letterSpacing: 1 }}>
            Woven with<br /><em style={{ color: "var(--gold-light)" }}>Centuries</em> of Craft
          </h1>
          <p className="fade-in" style={{ fontFamily: "var(--body)", fontSize: 15, color: "rgba(250,247,242,0.75)", marginTop: 22, maxWidth: 460, lineHeight: 1.8, animationDelay: "0.2s" }}>
            Discover rare handloom textiles directly from master artisans across India. Every thread tells a story. Every purchase sustains a heritage.
          </p>
          <div className="fade-in" style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap", animationDelay: "0.3s" }}>
            <button className="btn-primary" style={{ backgroundColor: "#D4AF37", color: "black", borderColor: "#D4AF37" }} onClick={() => onNavigate("shop")}>Explore Collections</button>
            <button className="btn-outline" style={{ color: "var(--cream)", borderColor: "rgba(250,247,242,0.5)" }} onClick={() => onNavigate("artisans")}>Meet the Artisans</button>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[["500+", "Master Artisans"], ["12", "Heritage Weaves"], ["80+", "Countries Reached"]].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "var(--display)", fontSize: 28, color: "var(--gold-light)", fontWeight: 600 }}>{n}</p>
                <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "rgba(250,247,242,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Strip ── */}
      <section style={{ background: "var(--deep)", padding: "20px 64px", display: "flex", gap: 32, overflowX: "auto", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 2, color: "var(--gold)", textTransform: "uppercase", flexShrink: 0 }}>Explore by Weave:</span>
        {["Banarasi", "Ikat", "Kanjivaram", "Jamdani", "Chanderi", "Pashmina", "Khadi"].map((w) => (
          <span key={w} onClick={() => onNavigate("shop")} style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 16, color: "var(--cream)", cursor: "pointer", flexShrink: 0 }}
            onMouseEnter={(e) => (e.target.style.color = "var(--gold-light)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--cream)")}
          >{w}</span>
        ))}
      </section>

      {/* ── Featured Products ── */}
      <section style={{ padding: "72px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <p className="section-label">Featured This Season</p>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 44px)", color: "var(--deep)", fontWeight: 300, marginTop: 6 }}>
              Exceptional Handlooms
            </h2>
          </div>
          <button className="btn-outline" onClick={() => onNavigate("shop")}>View All →</button>
        </div>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {featured.map((p, i) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} delay={i * 0.1} />)}
        </div>
      </section>

      {/* ── Mission Banner ── */}
      <section style={{ background: "var(--ivory)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "64px" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <p className="section-label" style={{ marginBottom: 12 }}>Our Mission</p>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px, 3.5vw, 40px)", color: "var(--deep)", fontWeight: 300, lineHeight: 1.25 }}>
              Every Purchase is an Act of Cultural Preservation
            </h2>
            <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--muted)", marginTop: 18, lineHeight: 1.9 }}>
              India's handloom sector employs 43 lakh weavers — the second largest workforce after agriculture. Yet 60% of traditional weaves are at risk of extinction due to mass-produced imitations.
            </p>
            <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => onNavigate("artisans")}>Meet the Artisans</button>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="artisan weaving" style={{ width: "100%", height: 380, objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: -18, left: -18, background: "var(--deep)", color: "var(--cream)", padding: "18px 24px", fontFamily: "var(--display)" }}>
              <p style={{ fontSize: 28, fontStyle: "italic", color: "var(--gold-light)" }}>72 hrs</p>
              <p style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Average per Banarasi Dupatta</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Artisan Spotlight ── */}
      <section style={{ padding: "72px 64px" }}>
        <p className="section-label" style={{ marginBottom: 8 }}>Artisan Spotlight</p>
        <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px, 3.5vw, 40px)", color: "var(--deep)", fontWeight: 300, marginBottom: 40 }}>
          The Hands Behind the Craft
        </h2>
        <div className="artisan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {ARTISANS.map((a) => (
            <div key={a.id} style={{ background: "var(--ivory)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <img src={a.img} alt={a.name} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <div style={{ padding: 22 }}>
                <p style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--deep)" }}>{a.name}</p>
                <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--gold)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 3 }}>{a.craft}</p>
                <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.7 }}>{a.story}</p>
                <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                  <div>
                    <p style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--gold)", fontStyle: "italic" }}>{a.experience}</p>
                    <p style={{ fontFamily: "var(--body)", fontSize: 10, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase" }}>Experience</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--gold)", fontStyle: "italic" }}>{a.products}</p>
                    <p style={{ fontFamily: "var(--body)", fontSize: 10, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase" }}>Products</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section style={{ background: "var(--deep)", padding: "48px 64px" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            { icon: "✦", title: "GI Tag Certified",   desc: "All products verified for geographic authenticity" },
            { icon: "🌍", title: "Worldwide Shipping", desc: "Delivered to 80+ countries with tracking" },
            { icon: "↩", title: "Easy Returns",        desc: "15-day hassle-free returns on all orders" },
            { icon: "🔒", title: "Secure Payments",    desc: "SSL encrypted, multi-currency checkout" },
          ].map((b) => (
            <div key={b.title} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, marginBottom: 10 }}>{b.icon}</p>
              <p style={{ fontFamily: "var(--display)", fontSize: 16, color: "var(--gold-light)", marginBottom: 6 }}>{b.title}</p>
              <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(250,247,242,0.55)", lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
