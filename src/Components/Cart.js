import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
const Cart = () => {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [cartItem, setCartItem] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cart/user/${user.id}`);
        setCart(response.data);
        const productIds = Array.isArray(response.data) ? response.data.map((row) => row.productId) : [];

        const response1 = await axios.get(`http://localhost:8080/api/product`);
        const filteredProducts = response1.data.filter((product) => productIds.includes(product.id));

        setCartItem(filteredProducts);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user?.id) {
      fetchCartItems();
    }
  }, [user]);

  const handleQuantityChange = async (userId, productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );

    try {
      const response = await fetch(
        `http://localhost:8080/cart/update?userId=${userId}&productId=${productId}&quantity=${change}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedCartResponse = await axios.get(`http://localhost:8080/cart/user/${userId}`);
      setCart(updatedCartResponse.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const calculateTotal = () => {
    return cartItem.reduce((acc, item) => {
      const cartItemData = cart.find((cartItem) => cartItem.productId === item.id);
      const quantity = cartItemData ? cartItemData.quantity : 1;
      return acc + item.price * quantity;
    }, 0);
  };
  
  const { setCheckOutItems } = useCart();
  const [checkOutItem, setCheckOutItem] = useState([])
  const handleCheckout = () => {
    const updatedCheckOutItems = cartItem.map((item) => {
      const cartItemData = cart.find((cartItem) => cartItem.productId === item.id);
      const quantity = cartItemData ? cartItemData.quantity : 1;
      return {
        productId: item.id,
        productPrice: item.price,
        productName: item.name,
        productQuantity: quantity,
      };
    });
    setCheckOutItem(updatedCheckOutItems);
    navigate(`/checkout`)
  };
  setCheckOutItems(checkOutItem)
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Your Shopping Cart</h1>

      {cartItem.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItem.map((item) => {
            const cartItemData = cart.find((cartItem) => cartItem.productId === item.id);
            const quantity = cartItemData ? cartItemData.quantity : 1;
            return (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.cartDetails}>
                  <h3 style={styles.productName}>{item.name}</h3>
                  <p style={styles.productDesc}>{item.description}</p>
                  <p style={styles.productPrice}>💰 Price: ${item.price}</p>
                </div>

                <div style={styles.quantityControl}>
                  <button onClick={() => handleQuantityChange(user.id, item.id, -1)} style={styles.qtyBtn}>
                    ➖
                  </button>
                  <span style={styles.qtyText}>{quantity}</span>
                  <button onClick={() => handleQuantityChange(user.id, item.id, 1)} style={styles.qtyBtn}>
                    ➕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={styles.checkoutContainer}>
        <span style={styles.totalPrice}>Total: <strong>${calculateTotal()}</strong></span>
        <button onClick={handleCheckout} style={styles.checkoutBtn}>🛍 Checkout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#777",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  },
  cartDetails: {
    flex: "1",
  },
  productName: {
    margin: "0",
    fontSize: "1.3rem",
    color: "#333",
  },
  productDesc: {
    margin: "5px 0",
    fontSize: "1rem",
    color: "#666",
  },
  productPrice: {
    margin: "5px 0",
    fontSize: "1.1rem",
    color: "#444",
    fontWeight: "bold",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qtyBtn: {
    padding: "10px 15px",
    fontSize: "1.2rem",
    backgroundColor: "#FF5722",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "0.3s",
  },
  qtyBtnHover: {
    backgroundColor: "#e64a19",
  },
  qtyText: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  checkoutContainer: {
    marginTop: "30px",
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  totalPrice: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  checkoutBtn: {
    padding: "12px 25px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Cart;
