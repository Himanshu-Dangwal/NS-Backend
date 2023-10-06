"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    tag: [],
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tag") {
      // Split the tags input into an array of tags
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setBlog({
        ...blog,
        [name]: tagsArray,
      });
    } else {
      setBlog({
        ...blog,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        // You can redirect to the login page or handle authentication as needed
        return;
      }

      const response = await fetch("http://127.0.0.1:8080/api/blogs/addBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        // Blog post created successfully, you can handle the response here
        const data = await response.json();
        router.push("/");
        console.log("Blog created:", data);

        // Redirect to a success page or perform other actions
      } else {
        // Handle error cases here
        console.error("Error creating blog post");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(blog);
  };

  return (
    <form onSubmit={handleSubmit} className="add-blog">
      <h2>Write a new blog...</h2>
      {/* <label>Title</label> */}
      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={handleChange}
        placeholder="blog title"
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={blog.imageUrl}
        onChange={handleChange}
        placeholder="image url"
      />
      {/* <label>Tags</label> */}
      <input
        type="text"
        name="tag"
        value={blog.tag.join(", ")}
        onChange={handleChange}
        placeholder="tags"
      />
      {/* <label>Description</label> */}
      <textarea
        name="description"
        value={blog.description}
        onChange={handleChange}
        placeholder="write your something here..."
        required
        rows="15"
        cols="50"
      />
      <input type="submit" className="submit" value="Publish" />
    </form>
  );
}
