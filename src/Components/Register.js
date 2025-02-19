import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
    
    const onSubmit = async (data) => {
      console.log("User Data:", data);
      
      const formData = new FormData();
      formData.append("user", JSON.stringify(data)); // Convert object to JSON string
      if (image) {
        formData.append("imageFile", image);
      }
    
      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "POST",
          body: formData,  
        });
    
        if (response.ok) {
          alert("Registration Successful!");
        } else {
          const errorText = await response.text();
          alert("Registration Failed: " + errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" {...register("firstName", { required: true })} />
          {errors.firstName && <p className="text-danger">First name is required</p>}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" {...register("lastName")} />
          {errors.lastName && <p className="text-danger">Last name is required</p>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" {...register("email")} />
          {errors.email && <p className="text-danger">Email is required</p>}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" {...register("phone")} />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" {...register("password", { required: true })} />
          {errors.password && <p className="text-danger">Password is required</p>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" {...register("address")}></textarea>
        </div>

        {/* City */}
        <div className="mb-3">
          <label className="form-label">City</label>
          <input type="text" className="form-control" {...register("city")} />
        </div>

        {/* State */}
        <div className="mb-3">
          <label className="form-label">State</label>
          <input type="text" className="form-control" {...register("state")} />
        </div>

        {/* Zip Code */}
        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input type="text" className="form-control" {...register("zipCode")} />
        </div>

        {/* Country */}
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input type="text" className="form-control" {...register("country")} />
        </div>

        {/* Profile Image URL */}
        <div className="mb-3">
          <label className="form-label">Profile Image URL</label>
          <input
              className="form-control"  type="file"  onChange={handleImageChange}
            />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
