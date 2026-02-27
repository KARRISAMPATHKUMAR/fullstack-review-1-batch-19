import StarRating from "../components/StarRating";
import { ARTISANS } from "../data/data";

export default function ArtisansPage() {
  return (
    <div style={{ padding: "48px 64px" }}>
      <p className="section-label" style={{ marginBottom: 6 }}>The Makers</p>
      <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 48px)", color: "var(--deep)", fontWeight: 300, marginBottom: 12 }}>
        Master Artisans
      </h1>
      <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--muted)", maxWidth: 560, lineHeight: 1.8, marginBottom: 48 }}>
        Each artisan on our platform is verified, trained, and part of a living tradition. Their craft is their identity.
      </p>

      {/* Artisan Grid */}
      <div className="artisan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {ARTISANS.map((a) => (
          <div key={a.id} style={{ background: "var(--ivory)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(90,50,10,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <img src={a.img} alt={a.name} style={{ width: "100%", height: 260, objectFit: "cover" }} />
            <div style={{ padding: 26 }}>
              <p className="section-label" style={{ marginBottom: 6 }}>{a.craft}</p>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 24, color: "var(--deep)", fontWeight: 400 }}>{a.name}</h2>
              <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginTop: 4 }}>📍 {a.region}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <StarRating rating={a.rating} />
                <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)" }}>{a.rating}</span>
              </div>
              <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--brown)", lineHeight: 1.8, marginTop: 14, borderLeft: "3px solid var(--gold)", paddingLeft: 14, fontStyle: "italic" }}>
                {a.story}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
                {[["Experience", a.experience], ["Products", a.products], ["Rating", a.rating + "★"]].map(([k, v]) => (
                  <div key={k} style={{ textAlign: "center", background: "white", padding: "12px 8px", border: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--gold)", fontStyle: "italic" }}>{v}</p>
                    <p style={{ fontFamily: "var(--body)", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1 }}>{k}</p>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ width: "100%", marginTop: 16 }}>View Collection</button>
            </div>
          </div>
        ))}
      </div>

      {/* Become an Artisan CTA */}
      <div style={{ marginTop: 72, background: "var(--deep)", padding: "52px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
        <div>
          <p className="section-label" style={{ color: "var(--gold-light)", marginBottom: 12 }}>Are you a weaver?</p>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px, 3vw, 36px)", color: "var(--cream)", fontWeight: 300 }}>
            Bring Your Craft to a Global Audience
          </h2>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "rgba(250,247,242,0.6)", marginTop: 14, lineHeight: 1.9 }}>
            Join 500+ artisans selling to buyers in 80 countries. Zero upfront cost. We handle shipping, payments, and marketing.
          </p>
          <button className="btn-primary" style={{ marginTop: 24, background: "var(--gold)", color: "var(--deep)" }}>Apply as Artisan</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {["Free Registration", "Global Reach", "Instant Payouts", "Dedicated Support", "Marketing Help", "GI Certification"].map((f) => (
            <div key={f} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "var(--gold)", fontSize: 16 }}>◆</span>
              <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(250,247,242,0.7)" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
