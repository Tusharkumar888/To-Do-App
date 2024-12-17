import axios from "axios";
import { ButtonComponent } from "../src/components/ButtonComponent";
import { Heading } from "../src/components/Heading";
import { InputComponent } from "../src/components/InputComponent";
import { SubHeading } from "../src/components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../public/Authpro";

export const Login = () => {
  const { login } = useAuth();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Basic Input Validation
    if (!userName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:500/api/v1/user/login", {
        userName,
        email,
        password,
      });

  
      if (response.data.token) {
        login(response.data.token,response.data.userId);
        alert("You have logged in successfully!"); 
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen w-full container mx-auto justify-center items-center bg-gray-300 font-serif">
      <div className="flex flex-col justify-center items-center p-4 w-[90%] sm:w-[40%] bg-white rounded-xl shadow-lg shadow-black">
        <Heading value="Sign In" />
        <SubHeading
          label="Don't have an account?"
          inputText="Sign Up"
          to="/signup"
        />

        {error && <div className="text-red-500 mt-2">{error}</div>}

        <InputComponent
          onChange={(e) => setUsername(e.target.value)}
          inputs="User Name"
          type="text"
          placeholder="Enter your username"
        />
        <InputComponent
          onChange={(e) => setEmail(e.target.value)}
          inputs="Email"
          type="email"
          placeholder="Enter your email"
        />
        <InputComponent
          onChange={(e) => setPassword(e.target.value)}
          inputs="Password"
          type="password"
          placeholder="Enter your password"
        />

        <ButtonComponent
          onClick={handleLogin}
          value={loading ? "Signing In..." : "Sign In"}
          disabled={loading}
        />

      </div>
    </div>
  );
};
