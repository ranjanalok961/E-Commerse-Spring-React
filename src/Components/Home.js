import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../Context/SearchContext";
import Navbar from "./Navbar";

const Home = () => {
  const [user] = useState(
      () => JSON.parse(localStorage.getItem("user")) || null
    );
  const { category } = useSearchContext();
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product");
        const updatedProducts = await Promise.all(
          response.data.map(async (item) => {
            const imageBlob = await axios.get(
              `http://localhost:8080/api/product/${item.id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(imageBlob.data);
            return { ...item, imageUrl };
          })
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem", color: "#ff3d3d" }}>
        ❌ Something went wrong... Please try again later!
      </h2>
    );
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const filteredProducts =
    category !== "All"
      ? products.filter((product) => product.category === category)
      : products;

  return (
    <>
      <Navbar />
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "20px",
          padding: "30px",
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            className="card"
            key={product.id}
            style={{
              width: "270px",
              height: "350px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.12)",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#fff",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              margin: "15px auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => handleProductClick(product.id)}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.transform = "translateY(-8px)";
            //   e.currentTarget.style.boxShadow = "0 15px 25px rgba(0, 0, 0, 0.18)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.transform = "translateY(0)";
            //   e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.12)";
            // }}
          >
            {/* Product Image */}
            <div
              style={{
                width: "100%",
                height: "220px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f9f9f9, #e3e3e3)",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>

            {/* Product Details */}
            <div
              className="card-body"
              style={{
                padding: "15px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h5
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#333",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {product.name}
              </h5>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#777",
                  margin: "6px 0",
                  fontWeight: "500",
                }}
              >
                {product.category}
              </p>
              <h5
                style={{
                  fontWeight: "700",
                  fontSize: "1.4rem",
                  color: "#ff5722",
                }}
              >
                ₹ {product.price}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
