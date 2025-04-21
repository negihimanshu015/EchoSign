import React from 'react';
import homeImg from './assets/home_img.png';
import { useNavigate } from 'react-router-dom';
import { FaHandPaper, FaGamepad, FaChartLine, FaUserFriends, FaSignInAlt, FaUserPlus } from 'react-icons/fa';


const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaHandPaper className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-blue-800">EchoSign</span>
          </div>                    
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
              Learn <span className="text-blue-600">ASL</span> Easily
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Master American Sign Language with our interactive platform featuring live sign recognition, personalized lessons, and gamified learning.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={() => navigate('/Learning')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
                Get Started
              </button>
              <button onClick={() => navigate('/LearnMore')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
              Learn More
            </button>              
            </div>
          </div>
          <div className="relative">
            <div className="bg-blue-100 rounded-2xl p-2 shadow-xl">
              <img 
                src= {homeImg} 
                alt="People communicating with sign language" 
                className="rounded-xl w-full h-auto"
              />
            </div>            
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your ASL Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who have successfully mastered American Sign Language with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={() => navigate('/Learning')} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
              Get Started
            </button>
            <button onClick={() => navigate('/LearnMore')} className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHandPaper className="text-blue-400 text-2xl" />
              <span className="text-xl font-bold">SignLearn</span>
            </div>
            <p className="text-gray-400">
              Making ASL learning accessible, interactive, and fun for everyone.
            </p>
          </div>
        </div>         
      </footer>
    </div>
  );
};

export default HomePage;