import React, { useState } from "react";
import "./Checkout.css";
import { useCart } from "../Context/CartContext";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const { checkOutItems } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "creditCard",
  });

  console.log("item", checkOutItems);

  const totalAmount = checkOutItems.reduce(
    (acc, item) => acc + item.productPrice * item.productQuantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Order Invoice", 10, 10);

    // Order Summary
    doc.setFontSize(14);
    doc.text("Order Summary:", 10, 20);

    let yOffset = 30;
    checkOutItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.productName} - ${item.productQuantity} x $${
          item.productPrice
        }`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    doc.text(`Total Amount: $${totalAmount}`, 10, yOffset + 10);

    // Billing Details
    doc.text("Billing Details:", 10, yOffset + 30);
    doc.text(`Name: ${formData.name}`, 10, yOffset + 40);
    doc.text(`Email: ${formData.email}`, 10, yOffset + 50);
    doc.text(
      `Address: ${formData.address}, ${formData.city}, ${formData.zip}`,
      10,
      yOffset + 60
    );
    doc.text(`Country: ${formData.country}`, 10, yOffset + 70);
    doc.text(`Payment Method: ${formData.paymentMethod}`, 10, yOffset + 80);

    // Save the PDF
    doc.save("Order_Invoice.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zip ||
      !formData.country
    ) {
      alert("Please fill in all billing details.");
      return;
    }
  
    // Prepare data for the backend
    const orderData = {
      userId: user.id, // Generate a random user ID (replace with actual user ID)
      time: new Date().toISOString(),
      paymentMethod: formData.paymentMethod,
      productIds: checkOutItems.map((item) => item.productId),
      totalAmount: totalAmount,
      billingDetails: `${formData.name}, ${formData.city}, ${formData.country}`,
      status: "Completed",
    };
  
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save order");
      }
  
      alert("Order placed successfully!");
      const wantsInvoice = window.confirm("Do you want to download the invoice?");
  
      if (wantsInvoice) {
        generatePDF();
      }

      navigate(`/`)
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {checkOutItems.map((item) => (
              <li key={item.productId}>
                {item.productName} -{" "}
                <strong>${item.productPrice * item.productQuantity}</strong>
              </li>
            ))}
          </ul>
          <h4>
            Total: <span>${totalAmount}</span>
          </h4>
        </div>

        {/* Billing Details */}
        <div className="billing-details">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              required
              onChange={handleInputChange}
            />
            <div className="input-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                required
                onChange={handleInputChange}
              />
            </div>
            <select name="country" required onChange={handleInputChange}>
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
            </select>
          </form>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          <h3>Payment Method</h3>
          <div className="payment-options">
            {[
              { value: "creditCard", label: "Credit/Debit Card", icon: "💳" },
              { value: "paypal", label: "PayPal", icon: "🅿️" },
              { value: "upi", label: "UPI", icon: "📲" },
            ].map((method) => (
              <label
                key={method.value}
                className={`payment-option ${
                  formData.paymentMethod === method.value ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={formData.paymentMethod === method.value}
                  onChange={handleInputChange}
                />
                <div className="payment-card">
                  <span className="payment-icon">{method.icon}</span>
                  <span className="payment-label">{method.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Place Order Button */}
        <div className="place-order">
          <button onClick={handleSubmit}>
            🛍️ Place Order & Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
