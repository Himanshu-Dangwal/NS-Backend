"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [authToken, setAuthToken] = useState(""); // Initialize authToken state

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
        "http://127.0.0.1:8080/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // User successfully created, you can handle the response here
        const data = await response.json();
        console.log("User created:", data);
        router.push('/login')

        // // Save the authToken in localStorage
        // localStorage.setItem("authToken", data.authToken);
        // setAuthToken(data.authToken); // Set the authToken state

        // Redirect to a success page or perform other actions
      } else {
        // Handle error cases here
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="">Sign Up</h2>
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={formData.email}
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
        <Link href="login">Already have an account? 🔗 </Link>
      </div>
    </form>
  );
}
