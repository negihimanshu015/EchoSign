import React from 'react';
import { signInstructions } from '../data/aslData';

const SignCard = ({ letter, onManualConfirm }) => {
  const instructions = signInstructions[letter];
  const isMotion = instructions?.isMotion;

  return (
    <div className="bg-[#111111] border border-[#1a1a1a] p-8 h-full flex flex-col">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-[#525252] font-bold">Target Sign</span>
        <div className="text-8xl font-bold text-[#f8f9fa] display-font mt-2">{letter}</div>
        {isMotion && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#caf0f8]/10 border border-[#caf0f8]/20 rounded-full">
            <div className="w-2 h-2 bg-[#caf0f8] rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-[#caf0f8]">Motion Sign</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-8">
        <section>
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#737373] font-bold mb-4">Instructions</h4>
          <ul className="space-y-4">
            {instructions?.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                <span className="text-[#404040] font-bold">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </section>

        {instructions?.commonMistakes && (
          <section>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#737373] font-bold mb-4">Common Mistakes</h4>
            <ul className="space-y-3">
              {instructions.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#737373] font-light italic">
                  <span className="text-[#caf0f8] font-bold">•</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pt-8 border-t border-[#1a1a1a]">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#737373] font-bold mb-4">Environment Guide</h4>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1 h-1 bg-[#404040] rounded-full mt-2 shrink-0" />
              <p className="text-xs text-[#737373] leading-relaxed">
                <span className="text-[#f8f9fa] block mb-1 font-medium">Bright, Even Lighting</span>
                Face your light source directly. Avoid strong backlighting or shadows on your hand.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-1 bg-[#404040] rounded-full mt-2 shrink-0" />
              <p className="text-xs text-[#737373] leading-relaxed">
                <span className="text-[#f8f9fa] block mb-1 font-medium">Clean Background</span>
                Use a neutral, non-cluttered background to help the model isolate your hand.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-1 bg-[#404040] rounded-full mt-2 shrink-0" />
              <p className="text-xs text-[#737373] leading-relaxed">
                <span className="text-[#f8f9fa] block mb-1 font-medium">Steady Positioning</span>
                Keep your hand 1-2 feet from the camera and centered within the frame.
              </p>
            </div>
          </div>
        </section>
      </div>

      {isMotion && (
        <button
          onClick={onManualConfirm}
          className="mt-8 w-full py-4 bg-[#f8f9fa] text-[#0a0a0a] text-[10px] uppercase tracking-widest font-bold hover:bg-[#caf0f8] transition-colors"
        >
          I signed it
        </button>
      )}
    </div>
  );
};

export default SignCard;
