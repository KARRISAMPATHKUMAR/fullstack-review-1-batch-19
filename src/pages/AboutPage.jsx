export default function AboutPage() {
  const timeline = [
    { year: "2019", title: "Founded in Varanasi",         text: "Two friends — a weaver's son and a tech entrepreneur — saw master artisans struggling to sell their work online against cheap imitations. HeritageLoom was born." },
    { year: "2021", title: "GI Certification Partnership", text: "Partnered with India's Geographical Indications Registry to provide certification badges on authenticated products, building buyer trust globally." },
    { year: "2023", title: "500+ Artisans Onboarded",     text: "Expanded from 3 states to 14, representing Banarasi, Ikat, Kanjivaram, Jamdani, Pashmina, Chanderi, and 8 other heritage weave traditions." },
    { year: "2024", title: "Going Global",                text: "Launched multi-currency checkout and international shipping to 80+ countries. 60% of orders now come from outside India." },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "var(--deep)", padding: "80px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="weave-pattern" style={{ position: "absolute", inset: 0 }} />
        <p className="section-label" style={{ color: "var(--gold-light)", marginBottom: 12 }}>Our Story</p>
        <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 5vw, 60px)", color: "var(--cream)", fontWeight: 300, lineHeight: 1.15, position: "relative" }}>
          Connecting Looms to<br />
          <em style={{ color: "var(--gold-light)" }}>Living Rooms Worldwide</em>
        </h1>
      </div>

      {/* Timeline */}
      <div style={{ padding: "72px 64px", maxWidth: 800, margin: "0 auto" }}>
        {timeline.map((item, i) => (
          <div key={item.year} style={{
            display: "flex", gap: 32, marginBottom: 48, paddingBottom: 48,
            borderBottom: i < timeline.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{ textAlign: "right", minWidth: 60 }}>
              <p style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--gold)", fontStyle: "italic" }}>{item.year}</p>
            </div>
            <div style={{ width: 1, background: "var(--border)", flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--deep)", marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
