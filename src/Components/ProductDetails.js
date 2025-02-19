import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState(null);
  const [user] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchProductImage();
  }, [id]);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem", color: "red" }}>
        Something went wrong...
      </h2>
    );
  }

  if (!product) {
    return (
      <div
        className="text-center"
        style={{ padding: "5rem", fontSize: "1.5rem", color: "#555" }}
      >
        Loading product details...
      </div>
    );
  }

  // Function to add product to cart
  const addDataToCard = async () => {
    if (!user) {
      alert("Please login first to add a product.");
      navigate("/login");
      return;
    }

    const cartItem = {
      userId: user.id,
      productId: product.id,
      quantity: 1,
      price: product.price,
      addedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.get(
        `http://localhost:8080/cart/user/${user.id}`
      );
      const productIds = Array.isArray(response.data)
        ? response.data.map((row) => row.productId)
        : [];
      if (productIds.includes(product.id)) {
        alert("Product already exist in your cart.");
      } else {
        await axios.post("http://localhost:8080/cart", cartItem);
        alert("✅ Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("❌ Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        borderRadius: "12px",
        maxWidth: "1100px",
        margin: "40px auto",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "row",
        gap: "30px",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Product Image */}
      <div style={{ flex: "1", textAlign: "center" }}>
        <img
          src={image || "default-image.jpg"}
          alt={product.name}
          style={{
            maxWidth: "450px",
            height: "450px",
            borderRadius: "12px",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      {/* Product Details */}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "2.7rem",
            color: "#333",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          {product.name}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            lineHeight: "1.8",
            marginBottom: "5px",
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            fontSize: "1.2rem",
          }}
        >
          <h3 style={{ fontSize: "1.6rem", color: "#000", fontWeight: "bold" }}>
            Price:{" "}
            <span
              style={{
                fontWeight: "bold",
                color: "#FF5722",
                fontSize: "1.8rem",
              }}
            >
              ₹{product.price.toFixed(2)}
            </span>
          </h3>

          <div>
            <strong>Brand:</strong> {product.brand}
          </div>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <div>
            <strong>Release Date:</strong>{" "}
            {new Date(product.releaseDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Availability:</strong>{" "}
            <span
              style={{
                color: product.productAvailable ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {product.productAvailable ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div>
            <strong>Stock Quantity:</strong> {product.stockQuantity}
          </div>
        </div>

        {/* Button Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            style={{
              padding: "14px 30px",
              backgroundColor: user ? "#3498DB" : "#7F8C8D",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(255, 87, 34, 0.3)",
            }}
            onClick={addDataToCard}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.backgroundColor = "#FF7043";
            //   e.currentTarget.style.transform = "scale(1.07)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.backgroundColor = "#FF5722";
            //   e.currentTarget.style.transform = "scale(1)";
            // }}
            // disabled={!user}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
