import { useNavigate } from 'react-router-dom';
import signImg from './assets/sign.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#0a0a0a]">
      {/* Navigation Bar */}
      <header className="py-5 px-8 md:px-12 lg:px-24 flex justify-between items-center slide-up">
        <div className="display-font text-2xl font-bold tracking-tight text-[#f8f9fa]">EchoSign</div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-8 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-16 items-center slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="md:col-span-5 flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl display-font leading-none mb-8 text-[#f8f9fa]">
            Speak <br /> <span className="text-[#caf0f8]">With Hands</span>
          </h1>
          <p className="font-light text-lg mb-12 max-w-sm leading-relaxed text-[#a3a3a3]">
            Master American Sign Language through interactive learning.
          </p>
          <div className="thin-line mb-8"></div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate('/Learning')}
              className="bg-[#f8f9fa] text-[#0a0a0a] px-8 py-3 text-sm font-light hover:bg-[#e9ecef] transition-colors rounded-full"
            >
              Start Practice
            </button>
            <button
              onClick={() => navigate('/LearnMore')}
              className="border border-[#f8f9fa] text-[#f8f9fa] px-8 py-3 text-sm font-light hover:bg-[#1a1a1a] transition-colors rounded-full"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="md:col-span-7 flex justify-end slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl relative overflow-hidden flex flex-col group">
            {/* Mockup App Header */}
            <div className="h-10 border-b border-[#1a1a1a] flex items-center px-4 justify-between bg-[#111111]">
              <div className="text-[10px] uppercase tracking-widest text-[#f8f9fa] font-bold">EchoSign</div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full border border-[#262626]" />
                <div className="w-2 h-2 rounded-full border border-[#262626]" />
                <div className="w-2 h-2 rounded-full border border-[#262626]" />
              </div>
            </div>

            <div className="flex flex-1">
              {/* Mockup Sidebar (Mini SignCard) */}
              <div className="w-1/3 border-r border-[#1a1a1a] p-6 flex flex-col bg-[#111111]">
                <div className="text-[8px] uppercase tracking-[0.2em] text-[#525252] font-bold mb-2">Target Sign</div>
                <div className="text-5xl font-bold text-[#f8f9fa] display-font mb-6">F</div>

                <div className="space-y-4">
                  <div className="text-[8px] uppercase tracking-[0.2em] text-[#404040] font-bold mb-2">Instructions</div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-2">
                      <div className="w-1 h-1 bg-[#262626] rounded-full mt-1" />
                      <div className="flex-1 space-y-1">
                        <div className="h-[2px] bg-[#1a1a1a] w-full" />
                        <div className="h-[2px] bg-[#1a1a1a] w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup Main (Mini CameraPanel) */}
              <div className="flex-1 relative bg-[#0a0a0a] overflow-hidden min-h-[300px] p-8">
                <div className="w-full h-full relative rounded-sm overflow-hidden border border-white/5">
                  {/* Real Sign Image from assets/sign.jpg */}
                  <img
                    src={signImg}
                    alt="Hand sign analysis"
                    className="absolute inset-0 w-full h-full object-contain opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 z-0"
                  />

                  {/* Detection Status Glass Box */}
                  <div className="absolute top-4 left-4 z-20 bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 p-3 flex flex-col gap-1 min-w-[120px]">
                    <span className="text-[6px] uppercase tracking-[0.2em] text-white/40 font-bold">Detection Status</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <div className="text-xl font-bold display-font text-[#caf0f8]">F</div>
                      <div className="text-[#caf0f8] text-[8px] font-medium opacity-60">99.7%</div>
                    </div>
                  </div>

                  {/* Scanning Line Animation */}
                  <div className="absolute inset-x-0 h-[1px] bg-[#caf0f8]/30 top-0 animate-scan z-10"></div>

                  {/* Scanning Corner Lines */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20 z-20"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20 z-20"></div>
                </div>
              </div>
            </div>

            {/* Mockup Bottom (Mini AlphabetMap) */}
            <div className="h-14 border-t border-[#1a1a1a] flex items-center px-6 gap-2 overflow-hidden bg-[#0a0a0a]">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((l) => (
                <div key={l} className={`w-8 h-10 border flex items-center justify-center display-font text-xs transition-all duration-500 ${l === 'F' ? 'bg-[#f8f9fa] text-[#0a0a0a] border-[#f8f9fa] scale-110' : 'border-[#262626] text-[#525252]'
                  }`}>
                  {l}
                </div>
              ))}
              <div className="text-[#262626] ml-2 tracking-widest">...</div>
            </div>

            {/* Abstract Background Glow */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-[#caf0f8] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
