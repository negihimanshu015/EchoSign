import React from 'react';
import Webcam from 'react-webcam';
import HoldRing from './HoldRing';

const CameraPanel = ({
  webcamRef,
  isPredicting,
  setIsPredicting,
  prediction,
  accuracy,
  streak,
  streakRequired,
  isMotion
}) => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 bg-[#111111] border border-[#1a1a1a] relative overflow-hidden group">
        {!isPredicting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm">
            <button
              onClick={() => setIsPredicting(true)}
              className="px-8 py-4 border border-[#f8f9fa] text-[#f8f9fa] text-[10px] uppercase tracking-[0.3em] hover:bg-[#f8f9fa] hover:text-[#0a0a0a] transition-all duration-500"
            >
              Initialize Camera
            </button>
          </div>
        )}

        {isPredicting && (
          <Webcam
            ref={webcamRef}
            className="w-full h-full object-cover opacity-80"
            screenshotFormat="image/jpeg"
            screenshotQuality={0.6}
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user"
            }}
            mirrored
          />
        )}

        {isPredicting && (
          <>
            {/* Scandi-style info glass box */}
            <div className="absolute top-8 left-8 z-20 bg-[#0a0a0a]/40 backdrop-blur-md border border-white/10 p-6 flex flex-col gap-1 min-w-[200px]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Detection Status</span>
              <div className="flex items-baseline gap-3 mt-1">
                <div className={`text-3xl font-bold display-font tracking-tight ${prediction === 'No hand detected' ? 'text-white/30' : 'text-[#caf0f8]'}`}>
                  {prediction || 'Initializing...'}
                </div>
                {accuracy > 0 && prediction !== 'No hand detected' && (
                  <div className="text-[#caf0f8] text-xs font-medium opacity-60">
                    {accuracy}%
                  </div>
                )}
              </div>
            </div>

            {!isMotion && (
              <HoldRing streak={streak} streakRequired={streakRequired} />
            )}

            <div className="absolute bottom-8 right-8 z-20">
              <button
                onClick={() => setIsPredicting(false)}
                className="w-12 h-12 rounded-full border border-[#262626] bg-[#0a0a0a]/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all group"
              >
                <div className="w-3 h-3 bg-red-500 rounded-sm group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </>
        )}

        <div className="absolute inset-0 pointer-events-none border-[20px] border-[#0a0a0a]" />
      </div>
    </div>
  );
};

export default CameraPanel;
