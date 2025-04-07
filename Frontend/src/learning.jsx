import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const LearningPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [accuracy, setAccuracy] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [targetSign, setTargetSign] = useState("A");
  const webcamRef = useRef(null);

  const captureAndPredict = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    // Convert base64 image to Blob
    const byteString = atob(imageSrc.split(',')[1]);
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const response = await axios.post("http://localhost:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.sign === "no_hand") {
        setPrediction("No hand detected");
        setAccuracy(0);
      } else {
        setPrediction(response.data.sign);
        setAccuracy(Math.round(response.data.confidence * 100));
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Error in prediction");
      setAccuracy(0);
    }
  }, [targetSign]);

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visited");
    if (!visitedBefore) {
      setShowOnboarding(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isPredicting) {
      interval = setInterval(captureAndPredict, 1000);
    }
    return () => clearInterval(interval);
  }, [isPredicting, captureAndPredict]);

  return (
    <div className="min-h-screen bg-gray-50">
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to ASL Practice</h2>
            <p className="mb-4">
              Real-time sign language recognition with instant feedback
            </p>
            <button
              onClick={() => setShowOnboarding(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Start Practicing
            </button>
          </div>
        </div>
      )}

      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <span className="text-xl font-bold text-blue-600">ASL Practice</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Sign Language Practice</h1>
          <p className="text-gray-600">
            Show the sign for <span className="font-semibold">'{targetSign}'</span> to the camera
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                screenshotFormat="image/jpeg"
                mirrored
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <select
                value={targetSign}
                onChange={(e) => setTargetSign(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="A">Letter A</option>
                <option value="B">Letter B</option>
                <option value="C">Letter C</option>
              </select>
              
              <button
                onClick={() => setIsPredicting(!isPredicting)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isPredicting 
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isPredicting ? "Stop Recognition" : "Start Recognition"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Live Results</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Predicted Sign</div>
                  <div className="text-3xl font-bold text-blue-600 mt-1">
                    {prediction || "-"}
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Confidence Level</div>
                  <div className="text-3xl font-bold text-green-600 mt-1">
                    {accuracy}%
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold mb-2">Tips for Better Recognition</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Keep your hand centered in the frame</li>
                <li>Maintain good lighting conditions</li>
                <li>Hold your hand steady while signing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          <p>© 2025 SignEase. Real-time sign language recognition system.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearningPage;