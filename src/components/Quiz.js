import React, { useState } from 'react';

// Separate data file (examData.js)
const categories = [
  {
    id: 1,
    name: 'SSC Exams',
    exams: [
      { name: 'SSC CGL', tests: 930 },
      { name: 'SSC GD Constable', tests: 719 },
      { name: 'DELHI POLICE CONSTABLE', tests: 23 },
      { name: 'SSC CHSL', tests: 803 },
      { name: 'SSC CPO', tests: 4400 },
      { name: 'SSC MTS', tests: 358 },
      { name: 'SSC JE', tests: 358 }
    ]
  },
  {
    id: 2,
    name: 'State Govt. Exams',
    exams: [
      { name: 'MPSC State Service', tests: 930 },
      { name: 'Rajasthan Patwari', tests: 719 },
      { name: 'MP Mahila Supervisor', tests: 23 },
      { name: 'Haryana CET Group 6', tests: 803 },
      { name: 'RSMSSB JE', tests: 4400 },
      { name: 'MP Excise Constable', tests: 358 }
    ]
  },
  {
    id: 3,
    name: 'Police Exams',
    exams: [
      { name: 'Bihar Police SI', tests: 1050 },
      { name: 'UP Police Sub Inspector', tests: 1928 },
      { name: 'Bihar Police Prohibition', tests: 839 },
      { name: 'Bihar Police Fireman', tests: 1375 }
    ]
  },
  {
    id: 4,
    name: 'Banking Exams',
    exams: [
      { name: 'IBPS PO', tests: 1050 },
      { name: 'SBI PO', tests: 1928 },
      { name: 'RBI Grade B', tests: 839 },
      { name: 'NABARD Grade A', tests: 1375 }
    ]
  },
  {
    id: 5,
    name: 'Civil Service Exams',
    exams: [
      { name: 'UPSC CSE', tests: 825 },
      { name: 'State PSC Exams', tests: 939 },
      { name: 'IFS', tests: 586 },
      { name: 'IES/ISS', tests: 1928 }
    ]
  },
  {
    id: 6,
    name: 'Railway Exams',
    exams: [
      { name: 'RRB NTPC', tests: 3556 },
      { name: 'RRB Group D', tests: 563 },
      { name: 'RRB JE', tests: 930 },
      { name: 'RRB ALP', tests: 719 }
    ]
  },
  {
    id: 7,
    name: 'Defence Exams',
    exams: [
      { name: 'NDA', tests: 803 },
      { name: 'CDS', tests: 23 },
      { name: 'AFCAT', tests: 4400 },
      { name: 'SSB Interview', tests: 358 }
    ]
  },
  {
    id: 8,
    name: 'Nursing Exams',
    exams: [
      { name: 'AIIMS Nursing', tests: 1050 },
      { name: 'PGIMER Nursing', tests: 1928 },
      { name: 'NIMHANS Nursing', tests: 839 },
      { name: 'ESIC Nursing', tests: 1375 }
    ]
  }
];

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Exam Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                selectedCategory?.id === category.id
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-4">
        {selectedCategory ? (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800 bg-blue-100 p-4 rounded-lg border border-blue-200">
              {selectedCategory.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCategory.exams.map((exam, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{exam.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {exam.tests.toLocaleString()} Tests
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Select a category to view exams
          </div>
        )}
      </div>
    </div>
  );
};
export default Quiz;