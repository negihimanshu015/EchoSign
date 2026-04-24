import React, { useState, useEffect, useCallback, useRef } from "react";
import { ASL_ALPHABET, signInstructions } from "./data/aslData";
import { useWebcamPredict } from "./hooks/useWebcamPredict";
import { useNavigate } from 'react-router-dom';

// New Components
import SignCard from "./components/SignCard";
import CameraPanel from "./components/CameraPanel";
import AlphabetMap from "./components/AlphabetMap";
import SuccessOverlay from "./components/SuccessOverlay";

const LearningPage = () => {
  const navigate = useNavigate();
  const hasInitialized = useRef(false);
  
  // -- PERSISTENCE --
  const [completedLetters, setCompletedLetters] = useState(() => {
    const saved = localStorage.getItem('echosign_mastered');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem('echosign_sessions');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [targetSign, setTargetSign] = useState("A");
  const [showSuccess, setShowSuccess] = useState(false);
  const [reviewLetters, setReviewLetters] = useState([]);
  const [isManualMode, setIsManualMode] = useState(false);

  // -- PREDICTION HOOK --
  const { 
    accuracy, 
    prediction, 
    isPredicting, 
    setIsPredicting, 
    webcamRef, 
    streak, 
    streakRequired, 
    isConfirmed,
    setIsConfirmed,
    resetStreak
  } = useWebcamPredict(targetSign);

  // -- SESSION QUEUE LOGIC --
  const getNextTarget = useCallback((mastered, sessions) => {
    // 1. Surface a review letter every 3rd session if any mastered
    if (sessions > 0 && sessions % 3 === 0 && mastered.length > 0) {
      const review = mastered[Math.floor(Math.random() * mastered.length)];
      setReviewLetters([review]);
      return review;
    }
    // 2. Next unlearned letter in alphabet
    const next = ASL_ALPHABET.find(l => !mastered.includes(l));
    return next ?? mastered[0];
  }, []);

  // Initialize target sign on mount
  useEffect(() => {
    if (!hasInitialized.current) {
        setSessionCount(prev => {
            const next = prev + 1;
            localStorage.setItem('echosign_sessions', next.toString());
            // Need to calculate next target with the fresh session count
            setTargetSign(getNextTarget(completedLetters, next));
            return next;
        });
        hasInitialized.current = true;
    }
  }, [completedLetters, getNextTarget]);

  // Sync mastered letters to localStorage
  useEffect(() => {
    localStorage.setItem('echosign_mastered', JSON.stringify(completedLetters));
  }, [completedLetters]);

  // -- HANDLERS --
  const handleSuccess = useCallback(() => {
    setCompletedLetters(prev => {
        if (!prev.includes(targetSign)) {
            return [...prev, targetSign];
        }
        return prev;
    });
    setShowSuccess(true);
  }, [targetSign]);

  const advanceQueue = useCallback(() => {
    setShowSuccess(false);
    setIsConfirmed(false);
    resetStreak();
    
    if (!isManualMode) {
        setTargetSign(getNextTarget(completedLetters, sessionCount));
    }
  }, [completedLetters, sessionCount, getNextTarget, resetStreak, setIsConfirmed, isManualMode]);

  // Effect to trigger success overlay when hook confirms
  useEffect(() => {
    if (isConfirmed) {
      handleSuccess();
    }
  }, [isConfirmed, handleSuccess]);

  const handleManualConfirm = () => {
    setIsConfirmed(true);
    handleSuccess();
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.removeItem('echosign_mastered');
      localStorage.removeItem('echosign_sessions');
      setCompletedLetters([]);
      setSessionCount(1);
      setTargetSign("A");
      setIsManualMode(false);
      resetStreak();
      setIsConfirmed(false);
    }
  };

  const jumpToLetter = (letter) => {
    setTargetSign(letter);
    setIsManualMode(completedLetters.includes(letter));
    resetStreak();
    setIsConfirmed(false);
  };

  const isMotion = signInstructions[targetSign]?.isMotion;

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-[#f8f9fa] overflow-hidden">
      {showSuccess && (
        <SuccessOverlay letter={targetSign} onComplete={advanceQueue} />
      )}

      {/* Header */}
      <header className="h-14 shrink-0 flex items-center justify-between px-8 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <div 
            className="display-font text-xl font-bold tracking-tighter cursor-pointer hover:text-[#caf0f8] transition-colors" 
            onClick={() => navigate('/')}
          >
            ECHOSIGN
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleReset}
            className="text-[10px] uppercase tracking-widest text-white/70 hover:text-[#caf0f8] transition-colors font-bold"
          >
            [ Reset Progress ]
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-row min-h-0">
        {/* Left Panel: Target & Instructions */}
        <div className="w-72 shrink-0 border-r border-[#1a1a1a] overflow-y-auto">
          <SignCard 
            letter={targetSign} 
            onManualConfirm={handleManualConfirm} 
          />
        </div>

        {/* Right Panel: Camera */}
        <div className="flex-1 min-w-0 bg-[#0a0a0a]">
          <CameraPanel
            webcamRef={webcamRef}
            isPredicting={isPredicting}
            setIsPredicting={setIsPredicting}
            prediction={prediction}
            accuracy={accuracy}
            streak={streak}
            streakRequired={streakRequired}
            isMotion={isMotion}
          />
        </div>
      </main>

      {/* Bottom: Alphabet Map */}
      <AlphabetMap 
        completedLetters={completedLetters}
        activeLetter={targetSign}
        onSelect={jumpToLetter}
        reviewLetters={reviewLetters}
      />
    </div>
  );
};

export default LearningPage;


