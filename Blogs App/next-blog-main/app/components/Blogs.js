"use client";
import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import Blog from "../components/Blog";
import Link from "next/link";
import { get } from "../../utils/api";
import parseDate from "@/utils/parseDate";
import { useData } from "@/context/AuthContext";

export default function Blogs() {
  const { blogs } = useData();
  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    get("blogs/")
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
  }, []);

  console.log(blogs);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  console.log(filteredBlogs);

  return (
    <div>
      {/* <p>Hi Hritvik</p> */}
      <input
        className="search"
        type="text"
        placeholder="search"
        value={searchInput} // Bind the value to the search input state
        onChange={(e) => setSearchInput(e.target.value)} // Step 2: Update state on input change
      />
      {/* <h1 className="all-posts-heading">All posts</h1> */}
      <div>
        {filteredBlogs.reverse().map((blog) => (
          <div key={blog._id} className="blog-container-individual">
            <Blog
              id={blog._id}
              title={blog.title}
              content={blog.description}
              author={blog.username}
              date={parseDate(blog.createdAt)}
              tags={blog.tag}
              imageUrl={blog.imageUrl}
            />
            <Link className="read-more" href={`/${blog._id}`}>
              Read More 🔗
            </Link>
        </div>
      ))}
      </div>
    </div>
  );
}
