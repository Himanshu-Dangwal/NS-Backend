"use client";
import { get } from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Blog from "../components/Blog";

export default function UserContext() {
  const [userData, setUserData] = useState({});
  const [userState, diapatch] = user

  useEffect(() => {
    // Fetch the authToken from local storage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("Auth token not found in local storage");
      return;
    }

    // Define the URL and options for the fetch request
    const url = "http://127.0.0.1:8080/api/auth/getuser";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json", // Set the content type if needed
      },
    };

    // Perform the fetch request
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data); // Update the state with user data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    console.log(userData);
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div>
        <div className="user-info">
          <p>{userData.username}</p>
          <p>({userData.email})</p>
        </div>
    </div>
  );
}
