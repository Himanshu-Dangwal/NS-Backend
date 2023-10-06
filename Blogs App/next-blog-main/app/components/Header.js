"use client";
import { AuthContextData, useData } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';


export default function Header() {
  const router = useRouter();
  const { user } = useData();
  const { authState, dispatch } = useContext(AuthContextData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if authToken is present in localStorage
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      // User is logged in, you can decode the token to get user info
      // For example, if the token contains user data in a JWT
      // const userData = decodeAuthToken(authToken);
      setIsLoggedIn(true);
      dispatch({ type: "LOGIN" , payload: authToken});
    }
  }, []);

  const handleLogout = () => {
    // Clear the auth token from local storage
    localStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });

    // Redirect to the login page or any other desired page
    router.push("/login");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link href="/">
          <span className="logo-p1">blogs</span>
          <span className="logo-p2">app</span>
        </Link>
      </div>
      <div className="header-right">
          {authState.isAuthenticated ? (
            <>
              <div className="nav-options">
              <Link href="/profile" className="profile-link"></Link>
              </div>
              <div className="nav-options">
                <Link href="/add" class="add-link"></Link>
              </div>
              <div class="nav-options">
                <Link href="/login" onClick={handleLogout}>Logout</Link>
              </div>
            </>
          ) : (
            <Link href="/login">login</Link>
            )}
      </div>
    </div>
  );
}

// {isLoggedIn ? <Link href="/profile" className="profile-link"><InitialsAvatar name="Sherlock Holmes" /></Link> : null}