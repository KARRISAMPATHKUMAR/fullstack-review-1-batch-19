import { useState, useMemo } from "react";

const EMPTY_FORM = {
  name: "", artisan: "", region: "", price: "", usd: "",
  weave: "", material: "", color: "", stock: "", badge: "",
  img: "", story: "", certified: false,
};

// ── Mock Orders Data ────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  { id: "HL-1001", buyer: "Priya Sharma",   product: "Banarasi Silk Dupatta",   region: "Varanasi, UP",       amount: 4200,  status: "Delivered", date: "2025-02-01", channel: "Organic" },
  { id: "HL-1002", buyer: "Meera Nair",     product: "Kanjivaram Silk Saree",   region: "Kanchipuram, TN",    amount: 18000, status: "Processing",date: "2025-02-03", channel: "Email" },
  { id: "HL-1003", buyer: "Sara Ali",       product: "Pochampally Ikat Saree",  region: "Telangana",          amount: 8500,  status: "Delivered", date: "2025-02-05", channel: "Social" },
  { id: "HL-1004", buyer: "Anjali Gupta",   product: "Jamdani Muslin Kurta",    region: "Dhaka, Bangladesh",  amount: 5600,  status: "Shipped",   date: "2025-02-07", channel: "Organic" },
  { id: "HL-1005", buyer: "Kavita Reddy",   product: "Chanderi Silk Stole",     region: "Chanderi, MP",       amount: 3200,  status: "Delivered", date: "2025-02-09", channel: "Paid Ads" },
  { id: "HL-1006", buyer: "Rekha Menon",    product: "Banarasi Silk Dupatta",   region: "Varanasi, UP",       amount: 4200,  status: "Delivered", date: "2025-02-11", channel: "Email" },
  { id: "HL-1007", buyer: "Sunita Das",     product: "Kanjivaram Silk Saree",   region: "Kanchipuram, TN",    amount: 18000, status: "Cancelled", date: "2025-02-12", channel: "Social" },
  { id: "HL-1008", buyer: "Divya Pillai",   product: "Jamdani Muslin Kurta",    region: "Dhaka, Bangladesh",  amount: 5600,  status: "Delivered", date: "2025-02-14", channel: "Organic" },
  { id: "HL-1009", buyer: "Pooja Iyer",     product: "Pochampally Ikat Saree",  region: "Telangana",          amount: 8500,  status: "Shipped",   date: "2025-02-16", channel: "Paid Ads" },
  { id: "HL-1010", buyer: "Nisha Kapoor",   product: "Chanderi Silk Stole",     region: "Chanderi, MP",       amount: 3200,  status: "Delivered", date: "2025-02-18", channel: "Email" },
  { id: "HL-1011", buyer: "Ritu Verma",     product: "Banarasi Silk Dupatta",   region: "Varanasi, UP",       amount: 4200,  status: "Processing",date: "2025-02-19", channel: "Paid Ads" },
  { id: "HL-1012", buyer: "Leela Bose",     product: "Kanjivaram Silk Saree",   region: "Kanchipuram, TN",    amount: 18000, status: "Delivered", date: "2025-02-20", channel: "Organic" },
  { id: "HL-1013", buyer: "Fatima Khan",    product: "Pochampally Ikat Saree",  region: "Telangana",          amount: 8500,  status: "Shipped",   date: "2025-02-21", channel: "Social" },
  { id: "HL-1014", buyer: "Gita Rao",       product: "Jamdani Muslin Kurta",    region: "Dhaka, Bangladesh",  amount: 5600,  status: "Delivered", date: "2025-02-22", channel: "Email" },
  { id: "HL-1015", buyer: "Neha Singh",     product: "Chanderi Silk Stole",     region: "Chanderi, MP",       amount: 3200,  status: "Delivered", date: "2025-02-23", channel: "Organic" },
];

const STATUS_COLORS = {
  Delivered:  { bg: "#e6f7ee", text: "#1a7a45", dot: "#22c55e" },
  Shipped:    { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Processing: { bg: "#fefce8", text: "#a16207", dot: "#eab308" },
  Cancelled:  { bg: "#fff1f2", text: "#be123c", dot: "#f43f5e" },
};

const CHANNEL_COLORS = {
  Organic:  "#4a7c59",
  Email:    "#9e3d1b",
  Social:   "#5c3a7c",
  "Paid Ads": "#2a5c7c",
};

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: "white", border: "1px solid var(--border)",
      padding: "22px 24px", display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: "50%",
        background: `${color}18`, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 22, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "var(--display)", fontSize: 28, color, fontStyle: "italic", lineHeight: 1 }}>{value}</p>
        <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{label}</p>
        {sub && <p style={{ fontFamily: "var(--body)", fontSize: 11, color, marginTop: 3 }}>{sub}</p>}
      </div>
    </div>
  );
}

function MiniBar({ label, value, max, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--brown)" }}>{label}</span>
        <span style={{ fontFamily: "var(--body)", fontSize: 12, color, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: 6, background: "#f1ece4", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

export default function MarketerPage({ products, orders: externalOrders, onAdd, onRemove, onUpdate }) {
  const orders = externalOrders || MOCK_ORDERS;
  const [tab, setTab] = useState("overview");

  // ── Product Management State ─────────────────────────────────────────────
  const [showForm, setShowForm]         = useState(false);
  const [editProduct, setEditProduct]   = useState(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [productSearch, setProductSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [localToast, setLocalToast]     = useState(null);

  const showLocalToast = (msg) => { setLocalToast(msg); setTimeout(() => setLocalToast(null), 3000); };

  const openAdd = () => { setEditProduct(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (p) => { setEditProduct(p); setForm({ ...p }); setShowForm(true); };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.artisan) { alert("Please fill in Name, Artisan and Price at minimum."); return; }
    if (editProduct) {
      onUpdate?.({ ...form, price: Number(form.price), usd: Number(form.usd), stock: Number(form.stock) });
      showLocalToast(`"${form.name}" updated successfully`);
    } else {
      onAdd?.({ ...form, id: Date.now(), price: Number(form.price), usd: Number(form.usd), stock: Number(form.stock), rating: 0, reviews: 0 });
      showLocalToast(`"${form.name}" added to shop`);
    }
    setShowForm(false); setForm(EMPTY_FORM);
  };

  const handleDelete = (p) => { onRemove?.(p.id); showLocalToast(`"${p.name}" removed`); setDeleteConfirm(null); };

  const filteredProducts = (products || []).filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.artisan.toLowerCase().includes(productSearch.toLowerCase())
  );
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ── Computed Stats ──────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = orders.length;
    const revenue = orders.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.amount, 0);
    const delivered = orders.filter(o => o.status === "Delivered").length;
    const cancelled = orders.filter(o => o.status === "Cancelled").length;
    const avgOrder = total ? Math.round(revenue / (total - cancelled)) : 0;

    const byChannel = {};
    orders.forEach(o => { byChannel[o.channel] = (byChannel[o.channel] || 0) + 1; });

    const byProduct = {};
    orders.forEach(o => { byProduct[o.product] = (byProduct[o.product] || 0) + 1; });

    const byStatus = {};
    orders.forEach(o => { byStatus[o.status] = (byStatus[o.status] || 0) + 1; });

    return { total, revenue, delivered, cancelled, avgOrder, byChannel, byProduct, byStatus };
  }, [orders]);

  // ── Filtered Orders ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchStatus  = statusFilter  === "All" || o.status  === statusFilter;
      const matchChannel = channelFilter === "All" || o.channel === channelFilter;
      const matchSearch  = !search || o.id.toLowerCase().includes(search.toLowerCase())
                                   || o.buyer.toLowerCase().includes(search.toLowerCase())
                                   || o.product.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchChannel && matchSearch;
    });
  }, [orders, statusFilter, channelFilter, search]);

  const maxChannel = Math.max(...Object.values(stats.byChannel));
  const maxProduct = Math.max(...Object.values(stats.byProduct));

  const TAB_STYLE = (active) => ({
    padding: "10px 20px", border: "none", cursor: "pointer",
    background: active ? "var(--gold)" : "transparent",
    color: active ? "var(--deep)" : "var(--muted)",
    fontFamily: "var(--body)", fontSize: 12, letterSpacing: 1.5,
    textTransform: "uppercase", fontWeight: active ? 700 : 400,
    transition: "all 0.2s", borderBottom: active ? "2px solid var(--deep)" : "2px solid transparent",
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>

      {/* ── Header ── */}
      <div style={{
        background: "var(--deep)", padding: "36px 40px", marginBottom: 32,
        position: "relative", overflow: "hidden",
      }}>
        <div className="weave-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>📢</span>
            <span style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 2, color: "var(--gold)", textTransform: "uppercase" }}>Marketing Dashboard</span>
          </div>
          <h1 style={{ fontFamily: "var(--display)", fontSize: 36, color: "var(--cream)", fontWeight: 300, marginBottom: 6 }}>
            Marketing Intelligence
          </h1>
          <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "rgba(250,247,242,0.55)" }}>
            Orders, revenue, and channel performance — all in one place.
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard icon="📦" label="Total Orders"    value={stats.total}                            color="#9e3d1b" />
        <StatCard icon="💰" label="Total Revenue"   value={`₹${stats.revenue.toLocaleString()}`}  color="#4a7c59" sub={`Avg ₹${stats.avgOrder.toLocaleString()} / order`} />
        <StatCard icon="✅" label="Delivered"        value={stats.delivered}                        color="#1a7a45" sub={`${Math.round((stats.delivered/stats.total)*100)}% fulfillment`} />
        <StatCard icon="❌" label="Cancelled"        value={stats.cancelled}                        color="#be123c" sub={`${Math.round((stats.cancelled/stats.total)*100)}% rate`} />
      </div>

      {/* ── Tabs ── */}
      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 28, display: "flex", gap: 4 }}>
        {["overview", "orders", "channels", "products"].map(t => (
          <button key={t} style={TAB_STYLE(tab === t)} onClick={() => setTab(t)}>
            {t === "overview" ? "📊 Overview" : t === "orders" ? "🧾 All Orders" : t === "channels" ? "📡 Channels" : "📦 Products"}
          </button>
        ))}
      </div>

      {/* ══════════ OVERVIEW TAB ══════════ */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* By Status */}
          <div style={{ background: "white", border: "1px solid var(--border)", padding: "24px 28px" }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--deep)", marginBottom: 20, fontStyle: "italic" }}>Order Status Breakdown</h3>
            {Object.entries(stats.byStatus).map(([status, count]) => {
              const s = STATUS_COLORS[status] || { text: "#666", bg: "#eee", dot: "#999" };
              return (
                <div key={status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1ece4" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot }} />
                    <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--brown)" }}>{status}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "var(--display)", fontSize: 20, color: s.text, fontStyle: "italic" }}>{count}</span>
                    <span style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>{Math.round((count / stats.total) * 100)}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Products */}
          <div style={{ background: "white", border: "1px solid var(--border)", padding: "24px 28px" }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--deep)", marginBottom: 20, fontStyle: "italic" }}>Top Products by Orders</h3>
            {Object.entries(stats.byProduct)
              .sort((a, b) => b[1] - a[1])
              .map(([product, count]) => (
                <MiniBar key={product} label={product.length > 28 ? product.slice(0, 28) + "…" : product} value={count} max={maxProduct} color="#9e3d1b" />
              ))}
          </div>

          {/* Channel Performance */}
          <div style={{ background: "white", border: "1px solid var(--border)", padding: "24px 28px" }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--deep)", marginBottom: 20, fontStyle: "italic" }}>Channel Performance</h3>
            {Object.entries(stats.byChannel)
              .sort((a, b) => b[1] - a[1])
              .map(([ch, count]) => (
                <MiniBar key={ch} label={ch} value={count} max={maxChannel} color={CHANNEL_COLORS[ch] || "#9e3d1b"} />
              ))}
          </div>

          {/* Quick Insights */}
          <div style={{ background: "var(--ivory)", border: "1px solid var(--border)", padding: "24px 28px" }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--deep)", marginBottom: 16, fontStyle: "italic" }}>💡 Marketing Insights</h3>
            {[
              { icon: "🏆", tip: `Best channel: ${Object.entries(stats.byChannel).sort((a,b) => b[1]-a[1])[0]?.[0]} with ${Object.entries(stats.byChannel).sort((a,b)=>b[1]-a[1])[0]?.[1]} orders` },
              { icon: "⭐", tip: `Top product: ${Object.entries(stats.byProduct).sort((a,b) => b[1]-a[1])[0]?.[0]?.split(" ").slice(0,3).join(" ")}` },
              { icon: "📉", tip: `Cancellation rate is ${Math.round((stats.cancelled/stats.total)*100)}% — ${stats.cancelled > 2 ? "consider follow-up campaigns" : "within healthy range"}` },
              { icon: "📈", tip: `Fulfillment rate: ${Math.round((stats.delivered/stats.total)*100)}% — ${stats.delivered/stats.total > 0.6 ? "excellent performance" : "room to improve"}` },
            ].map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16 }}>{ins.icon}</span>
                <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--brown)", lineHeight: 1.5 }}>{ins.tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ ORDERS TAB ══════════ */}
      {tab === "orders" && (
        <div>
          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <input
              placeholder="Search orders, buyers, products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: "9px 14px", border: "1px solid var(--border)", fontFamily: "var(--body)", fontSize: 13, background: "white" }}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: "9px 14px", border: "1px solid var(--border)", fontFamily: "var(--body)", fontSize: 12, background: "white", cursor: "pointer" }}
            >
              <option value="All">All Statuses</option>
              {["Delivered", "Shipped", "Processing", "Cancelled"].map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              value={channelFilter}
              onChange={e => setChannelFilter(e.target.value)}
              style={{ padding: "9px 14px", border: "1px solid var(--border)", fontFamily: "var(--body)", fontSize: 12, background: "white", cursor: "pointer" }}
            >
              <option value="All">All Channels</option>
              {["Organic", "Email", "Social", "Paid Ads"].map(c => <option key={c}>{c}</option>)}
            </select>
            <span style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Orders Table */}
          <div style={{ background: "white", border: "1px solid var(--border)", overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--deep)" }}>
                  {["Order ID", "Buyer", "Product", "Amount", "Channel", "Status", "Date"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(250,247,242,0.7)", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)" }}>No orders match your filters.</td></tr>
                ) : filtered.map((o, i) => {
                  const s = STATUS_COLORS[o.status] || {};
                  return (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f1ece4", background: i % 2 === 0 ? "white" : "var(--ivory)" }}>
                      <td style={{ padding: "13px 16px", fontFamily: "var(--body)", fontSize: 12, color: "var(--gold)", fontWeight: 700 }}>{o.id}</td>
                      <td style={{ padding: "13px 16px", fontFamily: "var(--body)", fontSize: 13, color: "var(--brown)" }}>{o.buyer}</td>
                      <td style={{ padding: "13px 16px", fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)" }}>{o.product}</td>
                      <td style={{ padding: "13px 16px", fontFamily: "var(--display)", fontSize: 15, color: "var(--deep)", fontStyle: "italic" }}>₹{o.amount.toLocaleString()}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ fontSize: 12, fontFamily: "var(--body)", color: CHANNEL_COLORS[o.channel] || "#666", fontWeight: 700 }}>
                          {o.channel}
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: s.bg, borderRadius: 20 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                          <span style={{ fontFamily: "var(--body)", fontSize: 11, color: s.text, fontWeight: 700 }}>{o.status}</span>
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px", fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)" }}>{o.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════ CHANNELS TAB ══════════ */}
      {tab === "channels" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {Object.entries(stats.byChannel).map(([channel, count]) => {
            const color = CHANNEL_COLORS[channel] || "#9e3d1b";
            const revenue = orders.filter(o => o.channel === channel && o.status !== "Cancelled").reduce((s, o) => s + o.amount, 0);
            const convRate = Math.round((orders.filter(o => o.channel === channel && o.status === "Delivered").length / count) * 100);
            return (
              <div key={channel} style={{ background: "white", border: `2px solid ${color}25`, padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--deep)", fontStyle: "italic" }}>{channel}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <p style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", marginBottom: 2 }}>Orders</p>
                    <p style={{ fontFamily: "var(--display)", fontSize: 32, color, fontStyle: "italic" }}>{count}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", marginBottom: 2 }}>Revenue</p>
                    <p style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--deep)", fontStyle: "italic" }}>₹{revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", marginBottom: 2 }}>Delivery Rate</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "#f1ece4", borderRadius: 3 }}>
                        <div style={{ height: "100%", width: `${convRate}%`, background: color, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontFamily: "var(--body)", fontSize: 12, color, fontWeight: 700 }}>{convRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Total summary card */}
          <div style={{ background: "var(--deep)", padding: "28px 24px", position: "relative", overflow: "hidden" }}>
            <div className="weave-pattern" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 12 }}>All Channels Combined</p>
              <p style={{ fontFamily: "var(--display)", fontSize: 38, color: "var(--cream)", fontStyle: "italic" }}>{stats.total}</p>
              <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(250,247,242,0.55)", marginBottom: 20 }}>total orders</p>
              <p style={{ fontFamily: "var(--display)", fontSize: 24, color: "var(--gold)", fontStyle: "italic" }}>₹{stats.revenue.toLocaleString()}</p>
              <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "rgba(250,247,242,0.55)" }}>total revenue (excl. cancelled)</p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ PRODUCTS TAB ══════════ */}
      {tab === "products" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 16 }}>
            <input
              placeholder="Search products or artisans…"
              value={productSearch}
              onChange={e => setProductSearch(e.target.value)}
              style={{ maxWidth: 320, padding: "9px 14px", border: "1px solid var(--border)", fontFamily: "var(--body)", fontSize: 13, background: "white" }}
            />
            <button className="btn-primary" onClick={openAdd} style={{ flexShrink: 0 }}>+ Add New Product</button>
          </div>

          <div style={{ background: "white", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 140px 100px 80px 100px 140px", background: "var(--deep)", padding: "12px 20px" }}>
              {["Image", "Product", "Artisan", "Price", "Stock", "Status", "Actions"].map(h => (
                <span key={h} style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(250,247,242,0.7)" }}>{h}</span>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div style={{ padding: 48, textAlign: "center" }}>
                <p style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--muted)", fontStyle: "italic" }}>No products found</p>
              </div>
            )}
            {filteredProducts.map((p, i) => (
              <div key={p.id} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 140px 100px 80px 100px 140px",
                padding: "14px 20px", alignItems: "center",
                borderBottom: i < filteredProducts.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "white" : "#faf7f2",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#f5f0e8"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "white" : "#faf7f2"}
              >
                <img src={p.img} alt={p.name} style={{ width: 44, height: 44, objectFit: "cover", border: "1px solid var(--border)" }} />
                <div>
                  <p style={{ fontFamily: "var(--display)", fontSize: 15, color: "var(--deep)" }}>{p.name}</p>
                  <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>{p.weave} · {p.region}</p>
                </div>
                <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--brown)" }}>{p.artisan}</p>
                <p style={{ fontFamily: "var(--display)", fontSize: 15, color: "var(--gold)", fontStyle: "italic" }}>₹{Number(p.price).toLocaleString()}</p>
                <span style={{ fontFamily: "var(--body)", fontSize: 12, color: p.stock <= 3 ? "var(--rust)" : "#4a7c59", fontWeight: 700 }}>
                  {p.stock <= 3 ? `⚠ ${p.stock}` : p.stock}
                </span>
                <span style={{
                  fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1,
                  background: p.certified ? "var(--gold-pale)" : "var(--ivory)",
                  color: p.certified ? "var(--rust)" : "var(--muted)",
                  border: `1px solid ${p.certified ? "var(--gold)" : "var(--border)"}`,
                  padding: "3px 8px",
                }}>{p.certified ? "✦ GI" : "Pending"}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => openEdit(p)} style={{ padding: "5px 12px", background: "var(--deep)", color: "var(--cream)", border: "none", fontFamily: "var(--body)", fontSize: 11, cursor: "pointer" }}>Edit</button>
                  <button onClick={() => setDeleteConfirm(p)} style={{ padding: "5px 12px", background: "transparent", color: "var(--rust)", border: "1px solid var(--rust)", fontFamily: "var(--body)", fontSize: 11, cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginTop: 14 }}>
            Showing {filteredProducts.length} of {(products || []).length} products
          </p>
        </div>
      )}

      {/* ── ADD / EDIT FORM MODAL ── */}
      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="modal-box" style={{ maxWidth: 600, padding: 0, overflow: "hidden" }} onClick={e => e.stopPropagation()}>
            <div style={{ background: "var(--deep)", padding: "24px 32px", position: "relative" }}>
              <div className="weave-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
              <button onClick={() => setShowForm(false)} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "rgba(250,247,242,0.5)", zIndex: 1 }}>×</button>
              <p style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 2, color: "var(--gold)", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
                {editProduct ? "Edit Product" : "Add New Product"}
              </p>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 24, color: "var(--cream)", fontWeight: 300, marginTop: 4, position: "relative", zIndex: 1 }}>
                {editProduct ? editProduct.name : "Create a New Listing"}
              </h2>
            </div>
            <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 16, maxHeight: "65vh", overflowY: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { key: "name",     label: "Product Name *",  placeholder: "e.g. Banarasi Silk Dupatta" },
                  { key: "artisan",  label: "Artisan Name *",  placeholder: "e.g. Raju Verma" },
                  { key: "region",   label: "Region",          placeholder: "e.g. Varanasi, UP" },
                  { key: "weave",    label: "Weave Type",      placeholder: "e.g. Zari Brocade" },
                  { key: "material", label: "Material",        placeholder: "e.g. Pure Silk" },
                  { key: "color",    label: "Colour",          placeholder: "e.g. Crimson & Gold" },
                  { key: "price",    label: "Price (₹) *",     placeholder: "e.g. 4200", type: "number" },
                  { key: "usd",      label: "Price (USD)",     placeholder: "e.g. 50",   type: "number" },
                  { key: "stock",    label: "Stock Quantity",  placeholder: "e.g. 10",   type: "number" },
                  { key: "badge",    label: "Badge Label",     placeholder: "e.g. Bestseller" },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>{field.label}</label>
                    <input type={field.type || "text"} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Image URL</label>
                <input placeholder="https://..." value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} />
                {form.img && <img src={form.img} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", marginTop: 8, border: "1px solid var(--border)" }} onError={e => e.target.style.display = "none"} />}
              </div>
              <div>
                <label style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Artisan Story</label>
                <textarea rows={3} placeholder="Tell the story behind this handloom product…" value={form.story} onChange={e => setForm({ ...form, story: e.target.value })} style={{ resize: "vertical", width: "100%", padding: "9px 14px", border: "1px solid var(--border)", fontFamily: "var(--body)", fontSize: 13 }} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={form.certified} onChange={e => setForm({ ...form, certified: e.target.checked })} style={{ width: "auto", accentColor: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--deep)" }}>✦ GI Tag Certified product</span>
              </label>
              <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
                <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1 }}>{editProduct ? "Save Changes" : "Add Product to Shop"}</button>
                <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirm && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div style={{ background: "var(--cream)", width: "92%", maxWidth: 420, padding: 36, animation: "slideUp 0.2s ease", textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <p style={{ fontSize: 36, marginBottom: 12 }}>🗑️</p>
            <h2 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--deep)" }}>Remove Product?</h2>
            <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)", marginTop: 8, lineHeight: 1.7 }}>
              Are you sure you want to remove <strong style={{ color: "var(--deep)" }}>{deleteConfirm.name}</strong> from the shop? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-primary" style={{ background: "var(--rust)" }}>Yes, Remove It</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {localToast && <div className="toast">✓ &nbsp;{localToast}</div>}
    </div>
  );
}
