import React from 'react';
import { ASL_ALPHABET } from '../data/aslData';

const LetterSelector = ({ targetSign, completedLetters, setTargetSign, setChallengeMode, setLearningPathMode }) => {
    return (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-13 gap-y-8 gap-x-2 letter-grid text-center">
            {ASL_ALPHABET.map((letter) => {
                const isCompleted = completedLetters.includes(letter);
                const isTarget = targetSign === letter;
                const index = ASL_ALPHABET.indexOf(letter);
                const isDisabled = index > completedLetters.length + 1;

                let textColorClass = "text-[#ced4da]"; // default/disabled
                if (isTarget) {
                    textColorClass = "text-[#212529]";
                } else if (isCompleted) {
                    textColorClass = "text-[#868e96]";
                } else if (!isDisabled) {
                    textColorClass = "text-[#adb5bd]";
                }

                return (
                    <button
                        key={letter}
                        onClick={() => {
                            setTargetSign(letter);
                            setChallengeMode(false);
                            setLearningPathMode(false);
                        }}
                        className={`display-font text-3xl md:text-4xl font-bold ${textColorClass} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={isDisabled}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
};

export default LetterSelector;
