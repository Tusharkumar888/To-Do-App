import { useState } from "react";
import { ButtonComponent } from "../src/components/ButtonComponent";
import { Heading } from "../src/components/Heading";
import { InputComponent } from "../src/components/InputComponent";
import { SubHeading } from "../src/components/SubHeading";
import { RadioInput } from "../src/components/RadioInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../public/Authpro";
export const Signup = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const options = ["male", "female"];

  const handleSignup = async () => {
    // Basic Input Validation
    if (!name || !surname || !userName || !email || !password || !gender) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:500/api/v1/user/signup", {
        name,
        surname,
        userName,
        email,
        gender,
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
    <div className="flex w-full h-screen container mx-auto justify-center items-center bg-gray-300 font-serif">
      <div className="flex flex-col pt-4 pb-6 px-6 justify-center items-center w-[90%] sm:w-[40%] bg-white rounded-xl shadow-lg shadow-black">
        <Heading value="Sign Up" />
        <SubHeading
          label="Already have an account?"
          inputText="Sign In"
          to="/login"
        />

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <InputComponent
          onChange={(e) => setName(e.target.value)}
          inputs="First Name"
          type="text"
          placeholder="Enter your first name"
        />
        <InputComponent
          onChange={(e) => setSurname(e.target.value)}
          inputs="Last Name"
          type="text"
          placeholder="Enter your last name"
        />
        <InputComponent
          onChange={(e) => setUsername(e.target.value)}
          inputs="Username"
          type="text"
          placeholder="Choose a username"
        />
        <InputComponent
          onChange={(e) => setEmail(e.target.value)}
          inputs="Email Address"
          type="email"
          placeholder="Enter your email"
        />
        <InputComponent
          onChange={(e) => setPassword(e.target.value)}
          inputs="Password"
          type="password"
          placeholder="Create a password"
        />

        <RadioInput
          options={options}
          name="gender"
          onChange={(e) => setGender(e.target.value)}
        />

        <ButtonComponent
          onClick={handleSignup}
          value={loading ? "Signing Up..." : "Sign Up"}
          disabled={loading}
        />

      </div>
    </div>
  );
};
