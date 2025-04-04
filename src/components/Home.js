import { Link } from "react-router-dom";
import { BookOpenIcon, NewspaperIcon, AcademicCapIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export const Home = () => {
  const newsItems = [
    { title: "Latest Government Job Updates", category: "News" },
    { title: "UPSC Prelims Preparation Tips", category: "Blog" },
    { title: "Banking Exam Syllabus Changes", category: "News" },
    { title: "SSC CGL Previous Year Papers", category: "Resources" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-400 to-pink-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Ultimate Exam Preparation Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Access curated study materials, practice tests, and expert guidance for all competitive exams
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<AcademicCapIcon className="h-12 w-12" />}
            title="Competitive Exams"
            description="Comprehensive preparation for SSC, Banking, UPSC, and more"
            link="/quiz"
          />
          <FeatureCard 
            icon={<BookOpenIcon className="h-12 w-12" />}
            title="Study Materials"
            description="Curated notes, previous year papers, and practice sets"
            link="/blog"
          />
          <FeatureCard 
            icon={<NewspaperIcon className="h-12 w-12" />}
            title="Daily News"
            description="Current affairs updates and exam notifications"
            link="/news"
          />
          <FeatureCard 
            icon={<QuestionMarkCircleIcon className="h-12 w-12" />}
            title="Q&A Forum"
            description="Get your doubts solved by experts and peers"
            link="/forum"
          />
        </div>
      </div>

      {/* News Highlights */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Latest Updates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((item, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-blue-600">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold mt-2 text-gray-800">
                  {item.title}
                </h3>
                <Link 
                  to="/news" 
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Join 1 Thousand+ Successful Learners
          </h2>
          <p className="text-gray-600 mb-8">
            Start your preparation journey today with free resources and expert guidance
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-red text-pink-600 px-8 py-3 rounded-lg font-semibold border border-green-600 hover:bg-yellow-500 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/quiz"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Explore Exams
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Wediscusshere</h3>
            <p className="text-gray-400">
              Your trusted partner in competitive exam preparation since 2024
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Exams</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/quiz" className="hover:text-white">SSC Exams</Link></li>
              <li><Link to="/quiz" className="hover:text-white">Banking Exams</Link></li>
              <li><Link to="/quiz" className="hover:text-white">UPSC Civil Services</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/blog" className="hover:text-white">Study Material</Link></li>
              <li><Link to="/blog" className="hover:text-white">Practice Tests</Link></li>
              <li><Link to="/news" className="hover:text-white">Current Affairs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link
      to={link}
      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
    >
      Explore now
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);