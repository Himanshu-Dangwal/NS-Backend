"use client";
import { AuthContextData } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";

export default function Login() {
  const router = useRouter();
  const { authState, dispatch } = useContext(AuthContextData);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/auth/login", // Use the login URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // User successfully logged in, you can handle the response here
        const data = await response.json();
        console.log("User logged in:", data);

        // Save the authToken in localStorage or perform other actions
        dispatch({ type: 'LOGIN', payload: response.authToken });
        localStorage.setItem("authToken", data.authToken);
        console.log(authState.isAuthenticated);
        router.push('/')

        // Redirect to a success page or perform other actions
      } else {
        // Handle authentication error cases here
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="">Login</h2>
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input type="submit" className="submit" />
      <div>
        <Link href="signup">Create a new account. 🔗 </Link>
      </div>
    </form>
  );
}
