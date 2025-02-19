import React, { useState } from "react";
import axios from "axios";
import './AddNewProduct.css'; // Assume you have a separate CSS file for styling
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
  const [user] = useState(
      () => JSON.parse(localStorage.getItem("user")) || null
    );
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    adminId:user.id,
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("imageFile", image);

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
      setProduct([])
      // navigate(`/`)
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-4 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <textarea
              className="form-control"
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: $1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
