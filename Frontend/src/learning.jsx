import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { ASL_ALPHABET, signInstructions } from "./data/aslData";
import { useWebcamPredict } from "./hooks/useWebcamPredict";
import LetterSelector from "./components/LetterSelector";
import ProgressInfo from "./components/ProgressInfo";
import ChallengePanel from "./components/ChallengePanel";
import LearningPathPanel from "./components/LearningPathPanel";
import { useNavigate } from 'react-router-dom';

const LearningPage = () => {
  const navigate = useNavigate();
  const { accuracy, prediction, isPredicting, setIsPredicting, webcamRef } = useWebcamPredict();

  const [targetSign, setTargetSign] = useState("A");
  const [completedLetters, setCompletedLetters] = useState([]);

  const [showDemo, setShowDemo] = useState(true);
  const [challengeMode, setChallengeMode] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState([]);
  const [currentChallengeStep, setCurrentChallengeStep] = useState(0);

  const [learningPathMode, setLearningPathMode] = useState(false);
  const [currentLearningPathIndex, setCurrentLearningPathIndex] = useState(0);

  useEffect(() => {
    if (prediction === targetSign && accuracy >= 85) {
      if (learningPathMode) {
        if (currentLearningPathIndex < ASL_ALPHABET.length - 1) {
          const nextIndex = currentLearningPathIndex + 1;
          setCurrentLearningPathIndex(nextIndex);
          setTargetSign(ASL_ALPHABET[nextIndex]);
        }
      }
      else if (challengeMode && currentChallengeStep < currentChallenge.length - 1) {
        const nextStep = currentChallengeStep + 1;
        setCurrentChallengeStep(nextStep);
        setTargetSign(currentChallenge[nextStep]);
      }
      else if (!learningPathMode && !challengeMode) {
        const currentIndex = ASL_ALPHABET.indexOf(targetSign);
        if (currentIndex < ASL_ALPHABET.length - 1 && !completedLetters.includes(targetSign)) {
          setCompletedLetters([...completedLetters, targetSign]);
        }
      }
    }
  }, [
    prediction,
    accuracy,
    targetSign,
    learningPathMode,
    currentLearningPathIndex,
    challengeMode,
    currentChallenge,
    currentChallengeStep,
    completedLetters,
  ]);

  const startChallenge = () => {
    const challengeLetters = ASL_ALPHABET.filter(l => completedLetters.includes(l));
    if (challengeLetters.length < 3) return;

    const randomChallenge = [];
    while (randomChallenge.length < 5) {
      const randomLetter = challengeLetters[Math.floor(Math.random() * challengeLetters.length)];
      randomChallenge.push(randomLetter);
    }

    setCurrentChallenge(randomChallenge);
    setCurrentChallengeStep(0);
    setTargetSign(randomChallenge[0]);
    setChallengeMode(true);
    setLearningPathMode(false);
  };

  const startLearningPath = () => {
    const firstUncompleted = ASL_ALPHABET.findIndex(l => !completedLetters.includes(l));
    if (firstUncompleted === -1) return;
    setCurrentLearningPathIndex(firstUncompleted);
    setTargetSign(ASL_ALPHABET[firstUncompleted]);
    setLearningPathMode(true);
    setChallengeMode(false);
  };

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visited");
    if (!visitedBefore) {
      setShowDemo(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <header className="py-8 px-8 md:px-12 lg:px-24 flex justify-between items-center slide-up">
        <div className="display-font text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>EchoSign</div>
        <nav className="flex gap-8 text-sm uppercase tracking-widest text-[#868e96]">
          <button className="link-hover text-[#212529]">Practice</button>
          <button onClick={() => navigate('/LearnMore')} className="link-hover">About</button>
        </nav>
      </header>

      <main className="flex-1 px-8 md:px-12 lg:px-24 pb-16 slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-[#adb5bd] mb-4">Module 01</div>
          <h1 className="text-5xl md:text-6xl display-font leading-none mb-6">Alphabet <br /> <span className="text-[#caf0f8]">Mastery.</span></h1>
          <div className="thin-line mb-8"></div>
          
          <LetterSelector
            targetSign={targetSign}
            completedLetters={completedLetters}
            setTargetSign={setTargetSign}
            setChallengeMode={setChallengeMode}
            setLearningPathMode={setLearningPathMode}
          />
        </div>

        <div className="grid md:grid-cols-12 gap-16">
          {/* Left Panel: Webcam, Prediction, and Instructions */}
          <div className="md:col-span-7 flex flex-col slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="aspect-video bg-[#e9ecef] border border-[#dee2e6] relative group overflow-hidden">
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                screenshotFormat="image/jpeg"
                mirrored
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-light border border-[#dee2e6]">
                <span className="font-bold">{prediction || '-'}</span> ({accuracy || 0}%)
              </div>
            </div>

            <div className="mt-8">
              {/* Mode Selection Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setIsPredicting(!isPredicting)}
                  className={`px-8 py-3 rounded-full text-sm font-light transition-colors ${
                    isPredicting
                      ? "bg-[#495057] text-white hover:bg-[#212529]"
                      : "bg-[#212529] text-white hover:bg-[#343a40]"
                  }`}
                >
                  {isPredicting ? "Stop Camera" : "Start Camera"}
                </button>

                <button
                  onClick={startLearningPath}
                  className={`px-8 py-3 rounded-full text-sm font-light border transition-colors ${
                    learningPathMode 
                      ? "bg-[#e9ecef] border-[#ced4da] text-[#495057]" 
                      : "border-[#212529] text-[#212529] hover:bg-[#f1f3f5]"
                  }`}
                  disabled={completedLetters.length === ASL_ALPHABET.length}
                >
                  {learningPathMode ? "Path Active" : "Start Path"}
                </button>

                <button
                  onClick={startChallenge}
                  className={`px-8 py-3 rounded-full text-sm font-light border transition-colors ${
                    challengeMode 
                      ? "bg-[#e9ecef] border-[#ced4da] text-[#495057]" 
                      : "border-[#212529] text-[#212529] hover:bg-[#f1f3f5]"
                  }`}
                  disabled={completedLetters.length < 3}
                >
                  {challengeMode ? "Challenge Active" : "Start Challenge"}
                </button>
              </div>

              <div className="pt-6 border-t border-[#dee2e6]">
                <h3 className="display-font text-xl mb-4">How to sign '{targetSign}'</h3>
                <ul className="space-y-3">
                  {signInstructions[targetSign]?.steps.map((step, i) => (
                    <li key={i} className="text-[#6c757d] font-light flex gap-4">
                      <span className="text-[#adb5bd] font-bold text-sm">0{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel: Progress Info */}
          <div className="md:col-span-5 flex flex-col slide-up" style={{ animationDelay: '0.3s' }}>
            <ProgressInfo completedLetters={completedLetters} accuracy={accuracy} />

            {/* Challenge Mode Panel */}
            {challengeMode && (
              <ChallengePanel
                currentChallenge={currentChallenge}
                currentChallengeStep={currentChallengeStep}
              />
            )}

            {/* Learning Path Panel */}
            {learningPathMode && (
              <LearningPathPanel
                currentLearningPathIndex={currentLearningPathIndex}
              />
            )}

            <div className="mt-8 pt-8 border-t border-[#dee2e6]">
              <h3 className="display-font text-xl mb-6">Learning Guide</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-[#495057] mb-2">Accuracy Metric</h4>
                  <p className="text-[#6c757d] font-light leading-relaxed">
                    The percentage indicates the system's confidence in recognizing your gesture. Maintain 85%+ consistently to master each letter.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-[#495057] mb-2">Progression</h4>
                  <p className="text-[#6c757d] font-light leading-relaxed">
                    Letters unlock sequentially as you demonstrate proficiency. Complete the required accurate attempts to advance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningPage;
