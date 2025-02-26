import { useState } from "react";
import { Tabs, Tab, TextField, Button } from "@mui/material";
import axios from "axios";

export default function AuthPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({ username: "", password: "" });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = tabIndex === 0 ? "/api/auth/login" : "/api/auth/register";
    try {
      const response = await axios.post(endpoint, formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-6">
      {/* Left Side - Login/Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white shadow-lg p-8 rounded-lg">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Welcome to VisaEase
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Your trusted partner for visa applications and services
          </p>

          {/* Tabs for Login/Register */}
          <Tabs
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
            variant="fullWidth"
            className="mb-6"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Login" className="font-semibold" />
            <Tab label="Register" className="font-semibold" />
          </Tabs>

          {/* Form Inputs */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <TextField 
              label="Username" 
              name="username"
              fullWidth 
              variant="outlined" 
              required 
              className="bg-white" 
              value={formData.username}
              onChange={handleChange}
            />
            <TextField 
              label="Password" 
              name="password"
              fullWidth 
              variant="outlined" 
              type="password" 
              required 
              className="bg-white" 
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" className="py-3 text-lg">
              {tabIndex === 0 ? "Login" : "Register"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Promotional Content */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#001A3A] text-white items-center justify-center p-12 rounded-lg shadow-lg">
        <div className="text-center max-w-md">
          <div className="mb-4 text-5xl">🌍</div>
          <h2 className="text-3xl font-bold">Your Gateway to Global Travel</h2>
          <p className="mt-6 text-lg leading-relaxed">
            Join thousands of satisfied travelers who trust VisaEase for their
            visa applications. Apply with confidence and participate in our
            exclusive lucky draw program.
          </p>
        </div>
      </div>
    </div>
  );
}
