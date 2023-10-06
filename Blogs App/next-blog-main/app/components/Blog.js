import React from "react";
import Link from 'next/link'

export default function Blog({ key, title, content, author, date, tags, imageUrl }) {
  // console.log(key) 
  return (
    <div className="blog-component">
      <div className="blog-img"><img src={imageUrl ? imageUrl : "https://www.floatex.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"} alt="blog image"/></div>
      <h2>{title}</h2>
      <div className="author-date">
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <p className="blog-component-contents">{content}</p>
      <p className="blog-tags">{tags && tags.map((tag, tagIdx) => (
        <div key={tagIdx} className="tag">{tag}</div>
      ))}</p>
    </div>
  );
}
