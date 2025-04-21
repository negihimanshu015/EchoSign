import { ArrowLeftIcon, CodeBracketIcon, CommandLineIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/" className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 prose">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-indigo-600">Sign Language</span> Recognition System
          </h1>
          <p className="text-xl text-gray-600">
            Bridging communication gaps through AI-powered sign language interpretation
          </p>
        </div>

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CodeBracketIcon className="h-6 w-6 mr-2 text-indigo-600" />
            Project Overview
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-indigo-600">
                Backend System
              </h3>
              <p className="text-gray-600 mb-4">
                Powered by FastAPI, our robust backend handles image processing and 
                machine learning inference with efficiency and scalability.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>RESTful API architecture</li>
                <li>Machine learning model integration</li>
                <li>Asynchronous processing</li>
                <li>Scalable cloud deployment</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-indigo-600">
                Frontend Interface
              </h3>
              <p className="text-gray-600 mb-4">
                Modern React-based interface designed for seamless user experience 
                and intuitive interaction.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Responsive design</li>
                <li>Real-time feedback</li>
                <li>Interactive visualization</li>
                <li>Cross-browser compatibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CommandLineIcon className="h-6 w-6 mr-2 text-indigo-600" />
            API Endpoint Documentation
          </h2>

          <div className="bg-gray-900 p-6 rounded-lg text-gray-100">
            <div className="mb-4">
              <span className="text-indigo-400 font-mono">POST</span>
              <span className="ml-2 font-mono">/predict</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Request</h4>
                <pre className="p-4 bg-gray-800 rounded text-sm">
{`{
  "file": "image/jpeg"  // Hand gesture image
}`}</pre>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Response</h4>
                <pre className="p-4 bg-gray-800 rounded text-sm">
{`{
  "prediction": "A",
  "confidence": 0.97,
  "timestamp": "2024-01-20T12:34:56Z"
}`}</pre>
              </div>
            </div>
          </div>
        </section>        
      </main>
    </div>
  );
}