import React, { useState } from 'react';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';
import img7 from '../images/img7.jpg';
import img8 from '../images/img8.jpg';

const categories = ["All", "World", "Politics", "Technology", "Sports"];

const newsItems = [
  { id: 1, title: "Global Climate Summit Reaches Historic Agreement", category: "World", image: img1, date: "2024-03-15", popular: true },
  { id: 2, title: "Major Tech Company Unveils Quantum Computing Breakthrough", category: "Technology", image: img2, date: "2024-03-14" },
  { id: 3, title: "International Peace Talks Make Significant Progress", category: "Politics", image: img3, date: "2024-03-14" },
  { id: 4, title: "Championship Finals Set New Viewership Records", category: "Sports", image: img4, date: "2024-03-13" },
  { id: 5, title: "Global Markets React to New Economic Policies", category: "World", image: img5, date: "2024-03-13" },
  { id: 6, title: "AI Revolutionizing the Healthcare Industry", category: "Technology", image: img6, date: "2024-03-12" },
  { id: 7, title: "Government Policies for Sustainable Development", category: "Politics", image: img7, date: "2024-03-12" },
  { id: 8, title: "The Future of Sports: Tech and Analytics", category: "Sports", image: img8, date: "2024-03-11" }
];

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalImage, setModalImage] = useState(null);
  
  const mostPopularNews = newsItems.find(item => item.popular);
  const filteredNews = selectedCategory === "All" ? newsItems : newsItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Most Popular News */}
      <div className="relative h-96 md:h-screen">
        <img 
          src={mostPopularNews.image} 
          alt={mostPopularNews.title}
          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
          onClick={() => setModalImage(mostPopularNews.image)}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
          <div className="max-w-4xl mx-auto text-white">
            <span className="bg-red-600 text-xs uppercase px-3 py-1 rounded-full">Most Popular</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-2 drop-shadow-2xl">{mostPopularNews.title}</h1>
            <p className="text-sm md:text-base opacity-90">Published on {new Date(mostPopularNews.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 border-b pb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category ? 'bg-blue-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews
            .filter(item => !item.popular) // Exclude popular news from grid
            .map(news => (
              <article key={news.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative group">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-64 object-cover"
                    onClick={() => setModalImage(news.image)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white text-sm font-medium">{news.category}</span>
                    <h3 className="text-white text-lg font-semibold mt-1 line-clamp-2">{news.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">{new Date(news.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </article>
            ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-gray-500">No news found in this category</div>
        )}
      </div>

      {/* Full-Screen Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img 
            src={modalImage} 
            alt="Full Screen View" 
            className="max-w-full max-h-full p-4 rounded-lg shadow-lg"
          />
          <button 
            className="absolute top-5 right-5 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            onClick={() => setModalImage(null)}
          >
            Close ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
