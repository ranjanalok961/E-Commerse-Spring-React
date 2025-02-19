import React, { useState, useEffect } from "react";
import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const [order, setOrder] = useState([]);
  const [pro, setPro] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/orders/user/${user.id}`
        );
        setOrder(response.data);
        const response1 = await axios.get("http://localhost:8080/api/product");
        setPro(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("order", order);
  console.log("Product", pro);
  useEffect(() => {
    // Fetch orders from API or use local storage
    const dummyOrders = [
      {
        id: "ORD12345",
        product: "Wireless Headphones",
        price: "$99.99",
        status: "Shipped",
        date: "2025-02-16",
      },
      {
        id: "ORD67890",
        product: "Laptop Stand",
        price: "$49.99",
        status: "Delivered",
        date: "2025-02-10",
      },
      {
        id: "ORD54321",
        product: "Smartphone Case",
        price: "$19.99",
        status: "Processing",
        date: "2025-02-18",
      },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2C3E50" }}>🛍️ Your Orders</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          No orders placed yet.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2C3E50", color: "#fff" }}>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => {
              const productNames = pro
                .filter((product) => order.productIds.includes(product.id))
                .map((product) => product.name);
              return (
                <tr
                  key={order.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                  }}
                >
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>
                    {productNames.map((name, index) => (
                      <p key={index}>{name}</p>
                    ))}
                  </td>
                  <td style={styles.td}>{order.totalAmount}</td>
                  <td
                    style={{
                      ...styles.td,
                      color:
                        order.status === "Shipped"
                          ? "#3498DB"
                          : order.status === "Completed"
                          ? "#2ECC71"
                          : "#E67E22",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={styles.td}>{order.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
};

export default Orders;
