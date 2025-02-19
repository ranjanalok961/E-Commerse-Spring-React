import "./App.css";

import AddNewProduct from "./Components/AddNewProduct";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./Context/SearchContext";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Checkout from "./Components/Checkout";
import { CartProvider } from "./Context/CartContext";
import Orders from "./Components/Orders";
import Profile from "./Components/Profile";

function App() {
  return (
      <CartProvider>
        <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/addNewProduct" element={<AddNewProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
        </SearchProvider>
      </CartProvider>
  );
}

export default App;
