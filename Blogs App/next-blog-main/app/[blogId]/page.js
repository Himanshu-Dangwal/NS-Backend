"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import blog from "../data/data.json";
import { get } from "@/utils/api";
import { AuthContextData } from "@/context/AuthContext";
import parseDate from "@/utils/parseDate";

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const params = useParams();
  const { blogId } = params;

  useEffect(() => {
    get("blogs/")
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
  }, []);

  const post = blogs.find((item) => item._id == blogId);

  // console.log(post.tag);
  if (!post) return <p>Blog post not found</p>;

  return (
    <div className="blog-post">
      <div className="blog-img">
        <img src={post.imageUrl ? `${post.imageUrl}`: "https://www.floatex.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"} />
      </div>
      <h2 className="blog-post-heading">{post.title}</h2>
      <div className="author-date">
        <p>{post.username}</p>
        <p>{parseDate(post.createdAt)}</p>
      </div>
      <p className="blog-tags">{post.tag && post.tag.map((tag, tagIdx) => (
        <div key={tagIdx} className="tag">{tag}</div>
      ))}</p>
      <p>{post.description}</p>
    </div>
  );
};

export default BlogPost;
