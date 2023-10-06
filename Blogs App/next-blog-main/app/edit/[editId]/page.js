"use client";
import { useData } from "@/context/AuthContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    tag: [],
    imageUrl: "",
  });
  const [editBlogPost, setEditBlogPost] = useState({});

  const params = useParams();
  const { editId } = params;
  console.log(editId);

  const { blogs } = useData();
  console.log(blogs);

  useEffect(() => {
    const post = blogs.find((item) => item._id == editId);
    setBlog(post);
    setEditBlogPost(post);
    // console.log(post);
  }, [editId]);

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
      const originalPost = blogs.find((item) => item._id == editId);
      // Create an object to store only the edited fields
      const editedFields = {};
      // Compare the edited values with the original values
      for (const key in blog) {
        if (blog[key] !== originalPost[key]) {
          editedFields[key] = blog[key];
        }
      }
      console.log(editedFields);

      const response = await fetch(
        `http://127.0.0.1:8080/api/blogs/updateBlog/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(editedFields),
        }
      );

      console.log(response);

      if (response.ok) {
        // Blog post created successfully, you can handle the response here
        const data = await response.json();
        console.log("Blog updated:", data);
        router.push(`/${editId}`);
        // Redirect to a success page or perform other actions
      } else {
        // Handle error cases here
        console.error("Error updating blog post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-blog">
      <h2>Edit Blog...</h2>
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
      ></textarea>
      <input type="submit" className="submit" value="Save Changes" />
    </form>
  );
}
