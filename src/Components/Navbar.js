import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../Context/SearchContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setCategory } = useSearchContext();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProductClick = () => {
    if (!user) {
      alert("Please login first to add a product.");
      navigate("/login");
    } else {
      navigate("/addNewProduct");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#2C3E50",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Left Section: Logo/Home */}
      <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
        <a
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {user?.name || "Home"}
        </a>
      </div>

      {/* Middle Section: Search and Category Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Category Dropdown */}
        <select
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "1rem",
            backgroundColor: "#fff",
            color: "#333",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            outline: "none",
          }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Laptop">Laptop</option>
          <option value="Headphone">Headphone</option>
          <option value="Mobile">Mobile</option>
          <option value="Electronics">Electronics</option>
          <option value="Toys">Toys</option>
          <option value="Fashion">Fashion</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            width: "280px",
            fontWeight: "500",
            outline: "none",
          }}
        />
      </div>

      {/* Right Section: Buttons (Add Product, Cart, Login/Logout) */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", position: "relative" }}>
        {/* Add New Product Button */}
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#E67E22",
            color: "#fff",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
            fontSize: "1rem",
            outline: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D35400")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E67E22")}
          onClick={handleAddProductClick}
        >
          + Add Product
        </button>

        {/* Cart Button */}
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: user ? "#3498DB" : "#7F8C8D",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: user ? "pointer" : "not-allowed",
            fontSize: "1rem",
            fontWeight: "600",
            transition: "0.3s",
            outline: "none",
          }}
          onMouseEnter={(e) => user && (e.currentTarget.style.backgroundColor = "#2980B9")}
          onMouseLeave={(e) => user && (e.currentTarget.style.backgroundColor = "#3498DB")}
          onClick={() => user && navigate(`/cart`)}
          disabled={!user}
        >
          🛒 Cart
        </button>

        {/* Login / User Menu */}
        {user ? (
          <div style={{ position: "relative" }}>
            {/* Three-dot Menu Icon */}
            <div
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ⋮
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "35px",
                  background: "#fff",
                  color: "#333",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "5px",
                  width: "150px",
                  zIndex: 100,
                }}
              >
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <li
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                    }}
                    onClick={() => navigate("/profile")}
                  >
                    👤 Profile
                  </li>
                  <li
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                    }}
                    onClick={() => navigate("/orders")}
                  >
                    📦 Orders
                  </li>
                  <li
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#1ABC9C",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              transition: "0.3s",
              outline: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16A085")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1ABC9C")}
            onClick={() => navigate("/login")}
          >
            🔑 Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
