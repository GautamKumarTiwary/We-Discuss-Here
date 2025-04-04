import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
          {post.category}
        </span>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <Link
          to={`/blog/${post.id}`}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          Read More
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;