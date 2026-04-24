import React from 'react';
import { ASL_ALPHABET } from '../data/aslData';

const AlphabetMap = ({ completedLetters, activeLetter, onSelect, reviewLetters = [] }) => {
  return (
    <div className="w-full bg-[#0a0a0a] border-t border-[#1a1a1a] py-3 overflow-x-auto shrink-0">
      <div className="flex gap-2 min-w-max px-8">
        {ASL_ALPHABET.map((letter, index) => {
          const isMastered = completedLetters.includes(letter);
          const isReview = reviewLetters.includes(letter);
          const isActive = activeLetter === letter;
          const isAvailable = isMastered || index === 0 || completedLetters.includes(ASL_ALPHABET[index - 1]);
          const isLocked = !isAvailable;

          let stateStyles = "text-[#404040] border-[#262626]";
          if (isActive) stateStyles = "text-[#f8f9fa] border-[#f8f9fa] scale-110 z-10";
          else if (isReview) stateStyles = "text-[#caf0f8] border-[#caf0f8]/30 bg-[#caf0f8]/5";
          else if (isMastered) stateStyles = "text-[#caf0f8] border-[#caf0f8]/20";
          else if (isAvailable) stateStyles = "text-[#a3a3a3] border-[#404040] hover:text-[#f8f9fa] hover:border-[#a3a3a3]";

          return (
            <button
              key={letter}
              disabled={isLocked}
              onClick={() => onSelect(letter)}
              className={`
                w-10 h-12 flex flex-col items-center justify-center border text-xs font-bold transition-all duration-300
                ${stateStyles}
                ${isLocked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span className="display-font">{letter}</span>
              {isMastered && !isActive && (
                <div className="w-1 h-1 bg-[#caf0f8] rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AlphabetMap;
