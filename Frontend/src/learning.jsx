import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const ASL_ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

const LearningPage = () => {
  // Basic states
  const [accuracy, setAccuracy] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [targetSign, setTargetSign] = useState("A");
  const [completedLetters, setCompletedLetters] = useState([]);
  const webcamRef = useRef(null);
  
  const [showDemo, setShowDemo] = useState(true);
  const [challengeMode, setChallengeMode] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState([]);
  const [currentChallengeStep, setCurrentChallengeStep] = useState(0);

  
  const [learningPathMode, setLearningPathMode] = useState(false);
  const [currentLearningPathIndex, setCurrentLearningPathIndex] = useState(0);

  
  const signInstructions = {
    A: {
      steps: [
        "Make a fist with your hand",
        "Keep thumb alongside the index finger",
      ],
      commonMistakes: [
        "Thumb wrapped over fingers",
        "Fingers not tightly closed",
      ],
    },
    B: {
      steps: [
        "Keep hand flat with fingers together",
        "Thumb pressed against palm",
      ],
      commonMistakes: ["Fingers bent", "Thumb not tucked in"],
    },
    C: {
      steps: [
        "Curve your hand to form a 'C' shape",
        "Maintain a slight gap between fingers",
      ],
      commonMistakes: ["Hand too rigid", "Incorrect curvature"],
    },
    D: {
      steps: [
        "Extend your index finger upward",
        "Curl remaining fingers into a round shape",
      ],
      commonMistakes: ["Using multiple fingers", "Incorrect hand posture"],
    },
    E: {
      steps: [
        "Curl your fingers so that your fingertips touch your thumb",
        "Keep your hand relaxed",
      ],
      commonMistakes: ["Fingers too extended", "Thumb not aligned"],
    },
    F: {
      steps: [
        "Touch the tip of your index finger to your thumb",
        "Keep the remaining fingers extended outward",
      ],
      commonMistakes: ["Fingers not straight", "Thumb too far apart"],
    },
    G: {
      steps: [
        "Extend your index finger and thumb horizontally",
        "Keep the other fingers curled inwards",
      ],
      commonMistakes: ["Improper angle of the index finger", "Other fingers accidentally extended"],
    },
    H: {
      steps: [
        "Extend your index and middle fingers horizontally",
        "Fold your remaining fingers into the palm",
      ],
      commonMistakes: ["Fingers not level", "Hand orientation off"],
    },
    I: {
      steps: [
        "Raise your pinky finger while keeping the rest of the fingers closed in a fist",
      ],
      commonMistakes: ["Accidentally extending the ring finger", "Not forming a complete fist"],
    },
    J: {
      steps: [
        "Trace a 'J' shape in the air with your pinky finger",
        "Keep your hand steady while drawing the curve",
      ],
      commonMistakes: ["Incomplete trace", "Using the wrong finger"],
    },
    K: {
      steps: [
        "Extend your index and middle fingers with a slight spread",
        "Place your thumb between them while keeping the other fingers curled",
      ],
      commonMistakes: ["Thumb not correctly positioned", "Fingers too far apart"],
    },
    L: {
      steps: [
        "Extend your index finger and thumb to form an 'L' shape",
        "Fold your remaining fingers into your palm",
      ],
      commonMistakes: ["Incorrect angle of the thumb", "Accidentally extending extra fingers"],
    },
    M: {
      steps: [
        "Curl your three middle fingers over your thumb",
        "Keep your index and pinky fingers folded underneath",
      ],
      commonMistakes: ["Improper finger overlap", "Thumb not sufficiently hidden"],
    },
    N: {
      steps: [
        "Curl your two middle fingers over your thumb",
        "Tuck your index and pinky fingers against your palm",
      ],
      commonMistakes: ["Too many fingers curled", "Thumb improperly positioned"],
    },
    O: {
      steps: [
        "Form a circular shape with your thumb and fingertips",
        "Keep your fingers smoothly curved together",
      ],
      commonMistakes: ["Loose hand posture", "Uneven circle formation"],
    },
    P: {
      steps: [
        "Extend your index and middle fingers downward",
        "Rest your thumb on the side of the middle finger for support",
      ],
      commonMistakes: ["Fingers misaligned", "Thumb not in the correct position"],
    },
    Q: {
      steps: [
        "Extend your index finger and thumb downward in a slight pinch",
        "Keep the remaining fingers folded in a fist",
      ],
      commonMistakes: ["Confusing with the 'G' sign", "Fingers not angled correctly"],
    },
    R: {
      steps: [
        "Cross your index and middle fingers",
        "Keep the rest of your fingers tucked in",
      ],
      commonMistakes: ["Fingers not properly crossed", "Excessive tension in the hand"],
    },
    S: {
      steps: [
        "Make a fist with your hand",
        "Place your thumb across your fingers",
      ],
      commonMistakes: ["Thumb placed underneath instead of across", "Fingers not completely curled"],
    },
    T: {
      steps: [
        "Make a fist with your hand",
        "Place your thumb between your index and middle finger",
      ],
      commonMistakes: ["Thumb positioned outside the fingers", "Fingers not fully curled"],
    },
    U: {
      steps: [
        "Extend your index and middle fingers together upward",
        "Fold the remaining fingers into your palm",
      ],
      commonMistakes: ["Separating the index and middle fingers", "Unsteady hand posture"],
    },
    V: {
      steps: [
        "Extend your index and middle fingers to form a 'V' shape",
        "Keep your other fingers tucked in",
      ],
      commonMistakes: ["Fingers not fully extended", "Incorrect angle"],
    },
    W: {
      steps: [
        "Extend your index, middle, and ring fingers to form a 'W'",
        "Keep your thumb and pinky finger folded against your palm",
      ],
      commonMistakes: ["Extra finger extended", "Uneven spacing of the fingers"],
    },
    X: {
      steps: [
        "Curl your index finger slightly to form a hook",
        "Keep the rest of your fingers in a fist",
      ],
      commonMistakes: ["Hook not clearly defined", "Accidental movement of other fingers"],
    },
    Y: {
      steps: [
        "Extend your thumb and pinky finger outward",
        "Keep your index, middle, and ring fingers folded into the palm",
      ],
      commonMistakes: ["Unintentionally extending the index finger", "Too tense of a hand posture"],
    },
    Z: {
      steps: [
        "Using your index finger, trace a 'Z' shape in the air",
        "Keep your hand steady throughout the gesture",
      ],
      commonMistakes: ["Incomplete trace", "Tracing too quickly or inaccurately"],
    },
  };
  

  
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
  
  const captureAndPredict = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    
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
      const response = await axios.post("https://echosign.onrender.com/predict", formData, {
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
  }, []);
  
  useEffect(() => {
    const visitedBefore = localStorage.getItem("visited");
    if (!visitedBefore) {
      setShowDemo(true);
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

  // Letter selection component
  const LetterButton = ({ letter }) => (
    <button
      onClick={() => {
        setTargetSign(letter);
        setChallengeMode(false);
        setLearningPathMode(false);
      }}
      className={`p-3 rounded-lg flex-1 ${
        targetSign === letter
          ? "bg-blue-500 text-white"
          : completedLetters.includes(letter)
          ? "bg-green-100"
          : "bg-gray-100"
      } ${
        ASL_ALPHABET.indexOf(letter) > completedLetters.length + 1
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
      disabled={ASL_ALPHABET.indexOf(letter) > completedLetters.length + 1}
    >
      {letter}
      {completedLetters.includes(letter) && " ✓"}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Learn ASL Alphabet</h1>
          <div className="flex gap-2 mb-4 flex-wrap justify-center">
            {ASL_ALPHABET.map((letter) => (
              <LetterButton key={letter} letter={letter} />
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Panel: Webcam, Prediction, and Instructions */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                screenshotFormat="image/jpeg"
                mirrored
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded">
                {prediction} ({accuracy}%)
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* Mode Selection Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setIsPredicting(!isPredicting)}
                  className={`py-3 rounded-lg font-semibold ${
                    isPredicting
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {isPredicting ? "Stop" : "Start"} Practice
                </button>

                <button
                  onClick={startLearningPath}
                  className={`py-3 rounded-lg font-semibold ${
                    learningPathMode ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                  disabled={completedLetters.length === ASL_ALPHABET.length}
                >
                  {learningPathMode ? "In Path" : "Start Path"}
                </button>

                <button
                  onClick={startChallenge}
                  className={`py-3 rounded-lg font-semibold ${
                    challengeMode ? "bg-purple-600" : "bg-purple-500 hover:bg-purple-600"
                  } text-white`}
                  disabled={completedLetters.length < 3}
                >
                  {challengeMode ? "In Challenge" : "Challenge"}
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">How to sign {targetSign}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {signInstructions[targetSign]?.steps.map((step, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Right Panel: Progress Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Mastered Letters</div>
                  <div className="text-2xl font-bold">
                    {completedLetters.length}
                  </div>
                </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Accuracy</div>
                <div className="text-2xl font-bold">
                  {accuracy}%
                </div>
              </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold mb-2">Tips for Success</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Practice in good lighting conditions</li>
                  <li>Keep your hand centered in frame</li>
                  <li>Hold each sign for 2 seconds</li>
                </ul>
              </div>
            </div>

            {/* Challenge Mode Panel */}
            {challengeMode && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Challenge Progress</h3>
                <div className="flex gap-2 mb-4">
                  {currentChallenge.map((sign, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index < currentChallengeStep
                          ? "bg-green-500 text-white"
                          : index === currentChallengeStep
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {sign}
                    </div>
                  ))}
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {currentChallengeStep === currentChallenge.length ? (
                    <div className="text-center text-green-600 font-bold">
                      Challenge Completed! 🎉
                    </div>
                  ) : (
                    `Current Target: ${currentChallenge[currentChallengeStep]}`
                  )}
                </div>
              </div>
            )}

            {/* Learning Path Panel */}
            {learningPathMode && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Learning Path Progress</h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {ASL_ALPHABET.map((letter, index) => (
                    <div
                      key={letter}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index < currentLearningPathIndex
                          ? "bg-green-500 text-white"
                          : index === currentLearningPathIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
  <div className="bg-gray-100 p-3 rounded-lg">
                  {currentLearningPathIndex >= ASL_ALPHABET.length ? (
                    <div className="text-center text-green-600 font-bold">
                      Congratulations! You've completed the alphabet! 🎉
                    </div>
                  ) : (
                    `Current Target: ${ASL_ALPHABET[currentLearningPathIndex]}`
                  )}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Learning Guide</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-1">Understanding Accuracy</h4>
                  <p className="text-sm text-gray-600">
                    The percentage shows the system's confidence in recognizing
                    your sign. Aim for 85%+ consistently to master each letter.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-1">Progression System</h4>
                  <p className="text-sm text-gray-600">
                    Letters unlock as you master previous ones. Complete the required number of correct attempts to progress.
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
