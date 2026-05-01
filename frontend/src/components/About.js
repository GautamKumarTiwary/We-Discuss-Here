import React, { useEffect } from "react";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Instagram, Twitter, Youtube } from "lucide-react";

const About = () => {
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/about-favicon.png";
    }
    return () => {
      if (favicon) {
        favicon.href = "/favicon.png";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About WeDiscussHere
          </h1>
          <p className="text-xl text-gray-600">
            Empowering Learners, Building Futures
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            At WeDiscussHere, we're revolutionizing exam preparation through
            collaborative learning. Our platform brings together aspirants,
            experts, and educators to create India's most dynamic learning
            community for competitive exams.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What We Offer
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Comprehensive exam resources</li>
                <li>✓ Daily current affairs updates</li>
                <li>✓ Expert-curated study material</li>
                <li>✓ Interactive practice tests</li>
                <li>✓ Real-time doubt solving</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Our Community
              </h3>
              <p className="text-gray-700">
                Join 500,000+ active learners who have:
                <br />
                • Attempted 2M+ practice tests
                <br />
                • Shared 150K+ study resources
                <br />
                • Maintained 4.9/5 satisfaction rating
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-6 mt-8">
            Connect With Us
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:support@WeDiscussHere.com"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <EnvelopeIcon className="h-6 w-6" />
              support@WeDiscussHere.com
            </a>
            
            <a
              href="https://instagram.com/WeDiscussHere"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-600 hover:text-pink-800"
            >
              <Instagram className="h-6 w-6" />
              @WeDiscussHere
            </a>

            <a
              href="https://twitter.com/WeDiscussHere"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Twitter className="h-6 w-6" />
              @WeDiscussHere
            </a>

            <a
              href="https://youtube.com/WeDiscussHere"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-red-600 hover:text-red-800"
            >
              <Youtube className="h-6 w-6" />
              WeDiscussHere TV
            </a>

            <a
              href="https://WeDiscussHere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
            >
              <GlobeAltIcon className="h-6 w-6" />
              Official Website
            </a>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p className="mb-2">
            Office: Deoghar, Jharkhand - 815353
          </p>
          <p>© 2025 WeDiscussHere. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default About;