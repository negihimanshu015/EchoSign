import React from 'react';
import homeImg from './assets/home_img.png';
import { FaHandPaper, FaGamepad, FaChartLine, FaUserFriends, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaHandPaper className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-blue-800">EchoSign</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Lessons</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Practice</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Profile</a>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 flex items-center">
              <FaSignInAlt className="mr-2" /> Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center">
              <FaUserPlus className="mr-2" /> Register
            </button>
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
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
                Get Started - It's Free
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
                Watch Demo
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

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Learn With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl hover:shadow-md transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaHandPaper className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Sign Recognition</h3>
              <p className="text-gray-600">Our AI technology provides instant feedback on your signing accuracy.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl hover:shadow-md transition">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaGamepad className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified Learning</h3>
              <p className="text-gray-600">Earn points, badges, and level up as you master ASL.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl hover:shadow-md transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaChartLine className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Progress</h3>
              <p className="text-gray-600">Adaptive lessons tailored to your learning pace and style.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl hover:shadow-md transition">
              <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaUserFriends className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-600">Connect with other learners and native signers for practice.</p>
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
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
              Get Started - It's Free
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-700 transition">
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