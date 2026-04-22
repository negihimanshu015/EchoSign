import React from 'react';
import homeImg from './assets/home_img.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="py-8 px-8 md:px-12 lg:px-24 flex justify-between items-center slide-up">
        <div className="display-font text-2xl font-bold tracking-tight">EchoSign</div>
        <nav className="flex gap-8 text-sm uppercase tracking-widest text-[#868e96]">
          <button onClick={() => navigate('/Learning')} className="link-hover text-[#212529]">Start Learning</button>
          <button onClick={() => navigate('/LearnMore')} className="link-hover">About</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-8 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-16 items-center slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="mb-4 text-xs uppercase tracking-widest text-[#adb5bd]">Interactive ASL</div>
          <h1 className="text-6xl md:text-7xl display-font leading-none mb-8">
            Clear <br /> <span className="text-[#caf0f8]">Motion.</span>
          </h1>
          <p className="font-light text-lg mb-12 max-w-sm leading-relaxed text-[#6c757d]">
            Master American Sign Language in a distraction-free environment.
          </p>
          <div className="thin-line mb-8"></div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => navigate('/Learning')} 
              className="bg-[#212529] text-white px-8 py-3 text-sm font-light hover:bg-[#495057] transition-colors rounded-full"
            >
              Start Practice
            </button>
            <button 
              onClick={() => navigate('/LearnMore')} 
              className="border border-[#212529] text-[#212529] px-8 py-3 text-sm font-light hover:bg-[#f1f3f5] transition-colors rounded-full"
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="md:col-span-7 flex justify-end slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white p-4 shadow-sm border border-gray-100 max-w-2xl w-full">
            <img 
              src={homeImg} 
              alt="People communicating with sign language" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </main>

    </div>
  );
};

export default HomePage;