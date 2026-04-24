import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function LearnMore() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Navigation */}
      <header className="py-8 px-8 md:px-12 lg:px-24 flex justify-between items-center slide-up">
        <button 
          onClick={() => navigate('/')} 
          className="display-font text-2xl font-bold tracking-tight text-[#f8f9fa] flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <ArrowLeftIcon className="h-5 w-5 text-[#caf0f8]" />
          EchoSign
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 md:px-12 lg:px-24 py-12 slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Hero Section */}
        <div className="mb-24">
          <div className="text-xs uppercase tracking-widest text-[#525252] mb-4">Documentation</div>
          <h1 className="text-5xl md:text-6xl display-font leading-none mb-8 text-[#f8f9fa]">
            Sign Language <br /> <span className="text-[#caf0f8]">Recognition.</span>
          </h1>
          <p className="font-light text-lg max-w-xl leading-relaxed text-[#a3a3a3]">
            Bridging communication gaps through AI-powered sign language interpretation and real-time motion analysis.
          </p>
          <div className="thin-line mt-12"></div>
        </div>

        {/* Project Overview */}
        <section className="mb-24 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h2 className="display-font text-3xl text-[#f8f9fa] mb-6">Overview</h2>
            <div className="text-xs uppercase tracking-widest text-[#525252]">The core technology stack</div>
          </div>
          
          <div className="md:col-span-8 grid md:grid-cols-2 gap-12">
            <div className="border border-[#1a1a1a] p-8">
              <h3 className="display-font text-xl mb-4 text-[#caf0f8]">Backend System</h3>
              <p className="text-[#a3a3a3] font-light leading-relaxed mb-6 text-sm">
                Powered by FastAPI, our robust backend handles image processing and 
                machine learning inference with efficiency.
              </p>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-[#525252]">
                <li>• RESTful API</li>
                <li>• ML Model Integration</li>
                <li>• Async Processing</li>
              </ul>
            </div>

            <div className="border border-[#1a1a1a] p-8">
              <h3 className="display-font text-xl mb-4 text-[#caf0f8]">Frontend Interface</h3>
              <p className="text-[#a3a3a3] font-light leading-relaxed mb-6 text-sm">
                Modern React-based interface designed for seamless user experience 
                and intuitive interaction.
              </p>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-[#525252]">
                <li>• Responsive UI</li>
                <li>• Real-time Feedback</li>
                <li>• Custom Motion Logic</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="mb-24 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h2 className="display-font text-3xl text-[#f8f9fa] mb-6">API</h2>
            <div className="text-xs uppercase tracking-widest text-[#525252]">Endpoint documentation</div>
          </div>

          <div className="md:col-span-8">
            <div className="border border-[#1a1a1a] p-8 bg-[#0d0d0d]">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-[#caf0f8] font-bold display-font">POST</span>
                <span className="text-[#f8f9fa] font-light opacity-50">/predict</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#525252] mb-4">Request Body</h4>
                  <pre className="text-xs text-[#a3a3a3] font-mono leading-relaxed">
{`{
  "file": "image/jpeg"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#525252] mb-4">Response Object</h4>
                  <pre className="text-xs text-[#caf0f8] font-mono leading-relaxed">
{`{
  "prediction": "A",
  "confidence": 0.97
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>        
      </main>
    </div>
  );
}