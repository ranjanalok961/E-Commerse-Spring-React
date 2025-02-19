import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoginError(""); // Clear previous errors
    console.log("Login Data:", data);

    try {
      // Step 1: Fetch user details by email
      const response = await fetch(`http://localhost:8080/user/email?email=${data.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setLoginError("User not found!");
        return;
      }

      const user = await response.json();

      // Step 2: Check if password matches
      if (user.password === data.password) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login Successful!");
        navigate("/"); // Redirect to home
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-3">Login</h2>
        
        {loginError && <p className="text-danger text-center">{loginError}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })} 
              />
            </div>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })} 
              />
            </div>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <button 
            className="btn btn-link text-decoration-none fw-bold" 
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
