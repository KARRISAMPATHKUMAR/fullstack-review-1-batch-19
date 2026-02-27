import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "Buyer", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ padding: "64px", maxWidth: 700, margin: "0 auto" }}>
      <p className="section-label" style={{ marginBottom: 8 }}>Get in Touch</p>
      <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 48px)", color: "var(--deep)", fontWeight: 300, marginBottom: 32 }}>
        Contact Us
      </h1>

      {sent ? (
        <div style={{ background: "var(--ivory)", border: "1px solid var(--border)", padding: "40px", textAlign: "center" }}>
          <p style={{ fontSize: 32 }}>✦</p>
          <h2 style={{ fontFamily: "var(--display)", fontSize: 26, color: "var(--deep)", marginTop: 12 }}>Message Received</h2>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)", marginTop: 10 }}>We'll be in touch within 24 hours.</p>
          <button className="btn-outline" style={{ marginTop: 20 }} onClick={() => setSent(false)}>Send Another</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div>
              <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" type="email" />
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>I am a</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {["Buyer", "Artisan", "Marketing Partner", "Wholesale Buyer", "Press / Media"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us how we can help…" style={{ resize: "vertical" }} />
          </div>
          <button className="btn-primary" onClick={() => setSent(true)} style={{ width: "fit-content", marginTop: 8 }}>
            Send Message →
          </button>
        </div>
      )}

      {/* Contact Info */}
      <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { label: "For Buyers",    info: "support@heritageloom.com", sub: "Order help, returns, tracking" },
          { label: "For Artisans",  info: "artisans@heritageloom.com", sub: "Onboarding, listings, payouts" },
          { label: "Media & Press", info: "press@heritageloom.com", sub: "Interviews, brand collab, features" },
          { label: "Office",        info: "Varanasi, UP · India", sub: "By appointment" },
        ].map((c) => (
          <div key={c.label} style={{ padding: "20px 22px", background: "var(--ivory)", border: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{c.label}</p>
            <p style={{ fontFamily: "var(--display)", fontSize: 16, color: "var(--deep)" }}>{c.info}</p>
            <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
