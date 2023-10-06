"use client";
import Blog from "@/app/components/Blog";
import { useData } from "@/context/AuthContext";
import { get } from "@/utils/api";
import parseDate from "@/utils/parseDate";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Category() {
  const [filteredBlogs, setFilteredBlogs] = useState();
  const params = useParams();
  const { tagId } = params;
  console.log(tagId);

  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    get("blogs/")
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
      console.log(blogs)
    }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/tags/getAllTags")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data);
        console.log(category);
      })
    console.log(category)
    // Filter blogs based on the user ID when userData is available
    // if (category.length > 0) {
    //   const filteredBlogs = blogs.filter((blog) => blog.user === userData._id);
    // }
  },[]);


  const selectedTag = category.find((tag) => tag.categoryName === tagId);
  // console.log(tagBlogsId);
  // const tagsBlogsArr = tagBlogsId.category;

  useEffect(() => {
    // Filter blogs based on the selected tag
    if (selectedTag && blogs.length > 0) {
      const filteredBlogs = blogs.filter((blog) =>
        selectedTag.category.includes(blog._id)
      );
      setFilteredBlogs(filteredBlogs);
      console.log(filteredBlogs);
    }
  }, [selectedTag, blogs]);



  return (
    <div>
      <div className="heading-tag">{tagId}</div>
      {filteredBlogs && filteredBlogs.reverse().map((blog) => (
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
  );
}
