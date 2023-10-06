"use client";
import { get } from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import parseDate from "@/utils/parseDate";

export default function Login() {
  const [userData, setUserData] = useState({});
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    get("blogs/")
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });

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

  useEffect(() => {
    // Filter blogs based on the user ID when userData is available
    if (userData && blogs.length > 0) {
      const filteredBlogs = blogs.filter((blog) => blog.user === userData._id);
      setFilteredBlogs(filteredBlogs);
      console.log(filteredBlogs);
    }
  }, [userData, blogs]);
  // console.log(filteredBlogs);

  const handleDelete = (blogId) => {
    // Fetch the authToken from local storage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("Auth token not found in local storage");
      return;
    }

    const url = `http://127.0.0.1:8080/api/blogs/deleteBlog/${blogId}`;
    const options = {
      method: "DELETE", // Use DELETE method to delete the blog
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json", // Set the content type if needed
      },
    };

    // Perform the delete request
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // If the delete request is successful, remove the deleted blog from the state
        const updatedBlogs = filteredBlogs.filter(
          (blog) => blog._id !== blogId
        );
        setFilteredBlogs(updatedBlogs);
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <div>
      {userData ? (
        <div className="user-info">
          <p>📝</p>
          <p>{userData.username}</p>
          <p>({userData.email})</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div>
        {filteredBlogs <= 0 ? (
          <h1 className="your-blogs">You don't have any blogs!</h1>
        ) : (
          <h1 className="your-blogs">Your Blogs</h1>
        )}
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="blog-container-individual">
            <Blog
              id={blog._id}
              title={blog.title}
              content={blog.description}
              author={blog.username}
              date={parseDate(blog.createdAt)}
              tags={blog.tag}
            />
            <Link className="read-more" href={`/${blog._id}`}>
              Read More
            </Link>
            <div className="edit-del">
              <button>
                <Link className="read-more" href={`/edit/${blog._id}`}>
                  Edit
                </Link>
              </button>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
