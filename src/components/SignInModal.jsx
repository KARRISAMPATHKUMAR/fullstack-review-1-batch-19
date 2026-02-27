import { useState } from "react";
import { DEMO_ACCOUNTS, ROLE_COLORS, ROLE_ICONS } from "../data/data";

export default function SignInModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("signin");
  const [role, setRole] = useState("Buyer");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "signin") {
        const acc = DEMO_ACCOUNTS[form.email.toLowerCase()];
        if (!acc) { setError("No account found with that email."); return; }
        if (acc.password !== form.password) { setError("Incorrect password. Try again."); return; }
        onLogin({ name: acc.name, email: form.email, role: acc.role });
        onClose();
      } else {
        if (!form.name) { setError("Please enter your full name."); return; }
        onLogin({ name: form.name, email: form.email, role });
        onClose();
      }
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 460, padding: 0, overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background: "var(--deep)", padding: "32px 36px 24px", position: "relative" }}>
          <div className="weave-pattern" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 18,
            background: "none", border: "none", fontSize: 22,
            cursor: "pointer", color: "rgba(250,247,242,0.5)", zIndex: 1,
          }}>×</button>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🪡</span>
              <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--cream)" }}>HeritageLoom</span>
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: 28, color: "var(--cream)", fontWeight: 300 }}>
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(250,247,242,0.55)", marginTop: 4 }}>
              {mode === "signin" ? "Sign in to your account" : "Join our global handloom community"}
            </p>
          </div>
          {/* Mode Toggle */}
          <div style={{ display: "flex", marginTop: 20, position: "relative", zIndex: 1 }}>
            {["signin", "signup"].map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "9px", border: "none",
                background: mode === m ? "var(--gold)" : "rgba(255,255,255,0.08)",
                color: mode === m ? "var(--deep)" : "rgba(250,247,242,0.6)",
                fontFamily: "var(--body)", fontSize: 12, letterSpacing: 1.5,
                textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
                fontWeight: mode === m ? 700 : 400,
              }}>
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: "28px 36px 32px", background: "var(--cream)" }}>

          {/* Demo Hint */}
          {mode === "signin" && (
            <div style={{ background: "var(--ivory)", border: "1px solid var(--border)", padding: "10px 14px", marginBottom: 18 }}>
              <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--brown)", fontWeight: 700, marginBottom: 4 }}>Demo Accounts (click to fill):</p>
              {Object.entries(DEMO_ACCOUNTS).map(([email, acc]) => (
                <div key={email}
                  style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", padding: "2px 0" }}
                  onClick={() => setForm({ ...form, email, password: acc.password })}
                >
                  <span style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--gold)", textDecoration: "underline" }}>{email}</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>{acc.password}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <div>
                <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
            )}

            <div>
              <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
            </div>

            <div>
              <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {mode === "signup" && (
              <div>
                <label style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 10 }}>I am joining as</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {Object.keys(ROLE_ICONS).map((r) => (
                    <button key={r} onClick={() => setRole(r)} style={{
                      padding: "10px 12px",
                      border: `1.5px solid ${role === r ? ROLE_COLORS[r] : "var(--border)"}`,
                      background: role === r ? `${ROLE_COLORS[r]}12` : "white",
                      cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <span style={{ fontSize: 16 }}>{ROLE_ICONS[r]}</span>
                      <span style={{ fontFamily: "var(--body)", fontSize: 12, color: role === r ? ROLE_COLORS[r] : "var(--muted)", fontWeight: role === r ? 700 : 400 }}>{r}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "10px 14px", fontFamily: "var(--body)", fontSize: 12, color: "#b91c1c" }}>
                ⚠ {error}
              </div>
            )}

            <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: "100%", marginTop: 4, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Please wait…" : mode === "signin" ? "Sign In →" : "Create Account →"}
            </button>

            {mode === "signin" && (
              <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)", textAlign: "center", cursor: "pointer" }}>
                Forgot your password? <span style={{ color: "var(--gold)", textDecoration: "underline" }}>Reset it</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
