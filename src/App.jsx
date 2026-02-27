import { useState } from "react";
import "./styles/global.css";
import { PRODUCTS } from "./data/data";

// Components
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import CartModal    from "./components/CartModal";
import SignInModal  from "./components/SignInModal";
import Toast        from "./components/Toast";

// Pages
import HomePage     from "./pages/HomePage";
import ShopPage     from "./pages/ShopPage";
import ArtisansPage from "./pages/ArtisansPage";
import AboutPage    from "./pages/AboutPage";
import ContactPage  from "./pages/ContactPage";
import AdminPage    from "./pages/AdminPage";
import MarketerPage from "./pages/MarketerPage";

export default function App() {
  const [page,       setPage]       = useState("home");
  const [products,   setProducts]   = useState(PRODUCTS);
  const [cart,       setCart]       = useState([]);
  const [showCart,   setShowCart]   = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user,       setUser]       = useState(null);
  const [toast,      setToast]      = useState(null);

  const handleAddProduct    = (p)   => setProducts((prev) => [...prev, p]);
  const handleRemoveProduct = (id)  => { setProducts((prev) => prev.filter((p) => p.id !== id)); setCart((prev) => prev.filter((i) => i.id !== id)); };
  const handleUpdateProduct = (upd) => setProducts((prev) => prev.map((p) => p.id === upd.id ? upd : p));

  const addToCart = (product, qty) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    setToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleLogin = (u) => {
    setUser(u);
    setToast(`Welcome, ${u.name}! Signed in as ${u.role}`);
    if (u.role === "Admin") setPage("admin");
    if (u.role === "Marketing Specialist") setPage("marketer");
  };

  const handleSignOut = () => { setUser(null); setToast("Signed out successfully"); setPage("home"); };

  const navigateTo = (p) => {
    if (p === "admin" && (!user || user.role !== "Admin")) {
      setToast("Admin access only. Please sign in as Admin.");
      setShowSignIn(true);
      return;
    }
    if (p === "marketer" && (!user || user.role !== "Marketing Specialist")) {
      setToast("Marketer access only. Please sign in as Marketing Specialist.");
      setShowSignIn(true);
      return;
    }
    setPage(p);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Navbar page={page} onNavigate={navigateTo} cartCount={cartCount} onCartOpen={() => setShowCart(true)} user={user} onSignIn={() => setShowSignIn(true)} onSignOut={handleSignOut} />

      <main key={page} className="fade-in">
        {page === "home"     && <HomePage     onNavigate={navigateTo} onAddToCart={addToCart} products={products} />}
        {page === "shop"     && <ShopPage     onAddToCart={addToCart} products={products} />}
        {page === "artisans" && <ArtisansPage />}
        {page === "about"    && <AboutPage />}
        {page === "contact"  && <ContactPage />}
        {page === "admin"    && user?.role === "Admin" && (
          <AdminPage products={products} onAdd={handleAddProduct} onRemove={handleRemoveProduct} onUpdate={handleUpdateProduct} />
        )}
        {page === "marketer" && user?.role === "Marketing Specialist" && (
          <MarketerPage products={products} onAdd={handleAddProduct} onRemove={handleRemoveProduct} onUpdate={handleUpdateProduct} />
        )}
      </main>

      <Footer />

      {showCart   && <CartModal   cart={cart} onClose={() => setShowCart(false)} onRemove={removeFromCart} />}
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} onLogin={handleLogin} />}
      {toast      && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
