import React, { useState } from "react";
import BlogCard from "./BlogCard";
import img1 from "../images/img8.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import img6 from "../images/img6.jpg";

const categories = ["All", "Technology", "Science", "Health", "Business"];

const posts = [
  { id: 1, title: "Tech Innovations in 2025", category: "Technology", content: "Explore AI, blockchain, and more.", image: img2 },
  { id: 2, title: "Space Exploration Updates", category: "Science", content: "Latest missions in space.", image: img3 },
  { id: 3, title: "Healthy Living Tips", category: "Health", content: "Maintain a healthy lifestyle.", image: img4 },
  { id: 4, title: "Startup Trends", category: "Business", content: "New startup ecosystem trends.", image: img5 },
  { id: 5, title: "AI in Healthcare", category: "Technology", content: "How AI is changing medicine.", image: img6 },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen">
        <img 
          src={img1} 
          alt="Hero" 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Trend Blogger
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl">
            Your source of great content about technology, science, and modern business trends
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 shadow-md hover:shadow-lg hover:-translate-y-1"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No posts found in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;