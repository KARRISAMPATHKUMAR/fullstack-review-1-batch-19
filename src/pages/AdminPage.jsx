import { useState } from "react";

const EMPTY_FORM = {
  name: "", artisan: "", region: "", price: "", usd: "",
  weave: "", material: "", color: "", stock: "", badge: "",
  img: "", story: "", certified: false,
};

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: "white", border: "1px solid var(--border)",
      padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
      }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "var(--display)", fontSize: 26, color, fontStyle: "italic", lineHeight: 1 }}>{value}</p>
        <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{label}</p>
      </div>
    </div>
  );
}

export default function AdminPage({ products, onAdd, onRemove, onUpdate }) {
  const [tab, setTab] = useState("products");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({ ...product });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.artisan) {
      alert("Please fill in Name, Artisan and Price at minimum.");
      return;
    }
    if (editProduct) {
      onUpdate({ ...form, price: Number(form.price), usd: Number(form.usd), stock: Number(form.stock) });
      showToast(`"${form.name}" updated successfully`);
    } else {
      onAdd({
        ...form,
        id: Date.now(),
        price: Number(form.price),
        usd: Number(form.usd),
        stock: Number(form.stock),
        rating: 0,
        reviews: 0,
      });
      showToast(`"${form.name}" added to shop`);
    }
    setShowForm(false);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (product) => {
    onRemove(product.id);
    showToast(`"${product.name}" removed from shop`);
    setDeleteConfirm(null);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.artisan.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { key: "products",  label: "📦 Products",  },
    { key: "users",     label: "👥 Users",     },
    { key: "analytics", label: "📊 Analytics", },
  ];

  return (
    <div style={{ padding: "40px 48px", minHeight: "80vh" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <p className="section-label" style={{ marginBottom: 6 }}>Admin Panel</p>
          <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px,3.5vw,40px)", color: "var(--deep)", fontWeight: 300 }}>
            Platform Management
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            background: "#4a7c5918", border: "1px solid #4a7c5940",
            color: "#4a7c59", fontFamily: "var(--body)", fontSize: 11,
            padding: "4px 12px", letterSpacing: 1,
          }}>● LIVE</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 36 }}>
        <StatCard icon="📦" label="Total Products" value={products.length}          color="var(--gold)" />
        <StatCard icon="🧵" label="Artisans"        value="3"                        color="#4a7c59" />
        <StatCard icon="🛍️" label="Buyers"          value="128"                      color="#2a5c7c" />
        <StatCard icon="💰" label="Revenue (₹)"     value="4.2L"                     color="var(--rust)" />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "10px 22px", border: "none",
            background: tab === t.key ? "var(--deep)" : "transparent",
            color: tab === t.key ? "var(--cream)" : "var(--muted)",
            fontFamily: "var(--body)", fontSize: 12, letterSpacing: 1,
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            borderBottom: tab === t.key ? "2px solid var(--gold)" : "2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── PRODUCTS TAB ── */}
      {tab === "products" && (
        <div>
          {/* Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 16 }}>
            <input
              placeholder="Search products or artisans…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 320 }}
            />
            <button className="btn-primary" onClick={openAdd} style={{ flexShrink: 0 }}>
              + Add New Product
            </button>
          </div>

          {/* Products Table */}
          <div style={{ background: "white", border: "1px solid var(--border)", overflow: "hidden" }}>
            {/* Table Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "60px 1fr 140px 100px 80px 100px 120px",
              background: "var(--ivory)", borderBottom: "1px solid var(--border)",
              padding: "12px 20px",
            }}>
              {["Image", "Product", "Artisan", "Price", "Stock", "Status", "Actions"].map((h) => (
                <span key={h} style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {filtered.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--display)", fontSize: 20, color: "var(--muted)", fontStyle: "italic" }}>No products found</p>
              </div>
            )}
            {filtered.map((p, i) => (
              <div key={p.id} style={{
                display: "grid", gridTemplateColumns: "60px 1fr 140px 100px 80px 100px 120px",
                padding: "14px 20px", alignItems: "center",
                borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "white" : "#faf7f2",
                transition: "background 0.15s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-pale)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "white" : "#faf7f2")}
              >
                {/* Image */}
                <img src={p.img} alt={p.name} style={{ width: 44, height: 44, objectFit: "cover", border: "1px solid var(--border)" }} />

                {/* Name */}
                <div>
                  <p style={{ fontFamily: "var(--display)", fontSize: 15, color: "var(--deep)" }}>{p.name}</p>
                  <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>{p.weave} · {p.region}</p>
                </div>

                {/* Artisan */}
                <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--brown)" }}>{p.artisan}</p>

                {/* Price */}
                <p style={{ fontFamily: "var(--display)", fontSize: 15, color: "var(--gold)", fontStyle: "italic" }}>₹{Number(p.price).toLocaleString()}</p>

                {/* Stock */}
                <span style={{
                  fontFamily: "var(--body)", fontSize: 12,
                  color: p.stock <= 3 ? "var(--rust)" : "#4a7c59",
                  fontWeight: 700,
                }}>
                  {p.stock <= 3 ? `⚠ ${p.stock}` : p.stock}
                </span>

                {/* Badge */}
                <span style={{
                  fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1,
                  background: p.certified ? "var(--gold-pale)" : "var(--ivory)",
                  color: p.certified ? "var(--rust)" : "var(--muted)",
                  border: `1px solid ${p.certified ? "var(--gold)" : "var(--border)"}`,
                  padding: "3px 8px",
                }}>
                  {p.certified ? "✦ GI" : "Pending"}
                </span>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => openEdit(p)} style={{
                    padding: "5px 12px", background: "var(--deep)", color: "var(--cream)",
                    border: "none", fontFamily: "var(--body)", fontSize: 11, cursor: "pointer",
                    letterSpacing: 0.5,
                  }}>Edit</button>
                  <button onClick={() => setDeleteConfirm(p)} style={{
                    padding: "5px 12px", background: "transparent", color: "var(--rust)",
                    border: "1px solid var(--rust)", fontFamily: "var(--body)", fontSize: 11, cursor: "pointer",
                  }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--body)", fontSize: 12, color: "var(--muted)", marginTop: 14 }}>
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
      )}

      {/* ── USERS TAB ── */}
      {tab === "users" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {[
              { role: "Admin",                icon: "⚙️", color: "var(--rust)",  users: [{ name:"Admin User", email:"admin@heritageloom.com", status:"Active" }] },
              { role: "Artisan",              icon: "🧵", color: "#4a7c59",     users: [{ name:"Raju Verma", email:"artisan@heritageloom.com", status:"Active" }, { name:"Lakshmi Devi", email:"lakshmi@heritageloom.com", status:"Active" }, { name:"Murugan S.", email:"murugan@heritageloom.com", status:"Active" }] },
              { role: "Buyer",                icon: "🛍️", color: "#2a5c7c",     users: [{ name:"Priya Sharma", email:"buyer@heritageloom.com", status:"Active" }, { name:"Arjun Mehta", email:"arjun@gmail.com", status:"Active" }] },
              { role: "Marketing Specialist", icon: "📢", color: "#5c3a7c",     users: [{ name:"Ananya Singh", email:"marketer@heritageloom.com", status:"Active" }] },
            ].map((group) => (
              <div key={group.role} style={{ background: "white", border: "1px solid var(--border)" }}>
                <div style={{ padding: "14px 20px", background: "var(--ivory)", borderBottom: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{group.icon}</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 12, fontWeight: 700, color: group.color, letterSpacing: 1, textTransform: "uppercase" }}>{group.role}</span>
                  <span style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>{group.users.length} user{group.users.length > 1 ? "s" : ""}</span>
                </div>
                {group.users.map((u) => (
                  <div key={u.email} style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--deep)", fontWeight: 700 }}>{u.name}</p>
                      <p style={{ fontFamily: "var(--body)", fontSize: 11, color: "var(--muted)" }}>{u.email}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ background: "#4a7c5918", color: "#4a7c59", fontFamily: "var(--body)", fontSize: 10, padding: "2px 10px", letterSpacing: 1 }}>● {u.status}</span>
                      <button style={{ padding: "4px 10px", background: "none", border: "1px solid var(--rust)", color: "var(--rust)", fontFamily: "var(--body)", fontSize: 10, cursor: "pointer" }}>Suspend</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ANALYTICS TAB ── */}
      {tab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { title: "Top Selling Products", items: products.slice(0,4).map(p => ({ label: p.name, value: `₹${(p.price * Math.floor(Math.random()*10+1)).toLocaleString()}` })) },
            { title: "Orders by Region",     items: [{ label:"Varanasi, UP", value:"34 orders" }, { label:"Kanchipuram, TN", value:"28 orders" }, { label:"Kashmir", value:"22 orders" }, { label:"Telangana", value:"18 orders" }] },
            { title: "Low Stock Alert",       items: products.filter(p => p.stock <= 5).map(p => ({ label: p.name, value: `${p.stock} left`, warn: true })) },
            { title: "Platform Summary",      items: [{ label:"Total Revenue", value:"₹4,20,000" }, { label:"Orders This Month", value:"102" }, { label:"Avg Order Value", value:"₹4,118" }, { label:"Return Rate", value:"2.3%" }] },
          ].map((card) => (
            <div key={card.title} style={{ background: "white", border: "1px solid var(--border)" }}>
              <div style={{ padding: "14px 20px", background: "var(--ivory)", borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)" }}>{card.title}</p>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {card.items.map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--deep)" }}>{item.label}</span>
                    <span style={{ fontFamily: "var(--display)", fontSize: 15, color: item.warn ? "var(--rust)" : "var(--gold)", fontStyle: "italic" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ADD / EDIT FORM MODAL ── */}
      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="modal-box" style={{ maxWidth: 600, padding: 0, overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{ background: "var(--deep)", padding: "24px 32px", position: "relative" }}>
              <div className="weave-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
              <button onClick={() => setShowForm(false)} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "rgba(250,247,242,0.5)", zIndex: 1 }}>×</button>
              <p style={{ fontFamily: "var(--body)", fontSize: 11, letterSpacing: 2, color: "var(--gold-light)", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
                {editProduct ? "Edit Product" : "Add New Product"}
              </p>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 24, color: "var(--cream)", fontWeight: 300, marginTop: 4, position: "relative", zIndex: 1 }}>
                {editProduct ? editProduct.name : "Create a New Listing"}
              </h2>
            </div>

            {/* Form */}
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
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>

              {/* Image URL */}
              <div>
                <label style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                  Image URL or Path
                </label>
                <input
                  placeholder="https://... or /images/myproduct.jpg"
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
                {form.img && (
                  <img src={form.img} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", marginTop: 8, border: "1px solid var(--border)" }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>

              {/* Story */}
              <div>
                <label style={{ fontFamily: "var(--body)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                  Artisan Story
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell the story behind this handloom product…"
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* GI Certified */}
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.certified}
                  onChange={(e) => setForm({ ...form, certified: e.target.checked })}
                  style={{ width: "auto", accentColor: "var(--gold)" }}
                />
                <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--deep)" }}>
                  ✦ GI Tag Certified product
                </span>
              </label>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
                <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1 }}>
                  {editProduct ? "Save Changes" : "Add Product to Shop"}
                </button>
                <button className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirm && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div style={{
            background: "var(--cream)", width: "92%", maxWidth: 420,
            padding: "36px", animation: "slideUp 0.2s ease", textAlign: "center",
          }} onClick={(e) => e.stopPropagation()}>
            <p style={{ fontSize: 36, marginBottom: 12 }}>🗑️</p>
            <h2 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--deep)" }}>Remove Product?</h2>
            <p style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)", marginTop: 8, lineHeight: 1.7 }}>
              Are you sure you want to remove <strong style={{ color: "var(--deep)" }}>{deleteConfirm.name}</strong> from the shop? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-primary" style={{ background: "var(--rust)" }}>
                Yes, Remove It
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast">✓ &nbsp;{toast}</div>}
    </div>
  );
}
