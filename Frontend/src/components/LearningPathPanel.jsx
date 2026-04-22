import React from 'react';
import { ASL_ALPHABET } from '../data/aslData';

const LearningPathPanel = ({ currentLearningPathIndex }) => {
    return (
        <div className="border border-[#dee2e6] p-8 mt-8">
            <h3 className="display-font text-xl mb-6">Path Progress</h3>
            <div className="flex gap-2 mb-6 flex-wrap">
                {ASL_ALPHABET.map((letter, index) => {
                    let styleClass = "border border-[#dee2e6] text-[#ced4da]";
                    if (index < currentLearningPathIndex) {
                        styleClass = "bg-[#212529] text-white"; // Completed
                    } else if (index === currentLearningPathIndex) {
                        styleClass = "bg-[#e9ecef] border border-[#212529] text-[#212529] font-bold"; // Active
                    }

                    return (
                        <div
                            key={letter}
                            className={`w-10 h-10 flex items-center justify-center display-font text-lg ${styleClass}`}
                        >
                            {letter}
                        </div>
                    );
                })}
            </div>

            <div className="thin-line mb-6"></div>

            <div className="text-sm tracking-wide">
                {currentLearningPathIndex >= ASL_ALPHABET.length ? (
                    <div className="text-[#212529] font-bold uppercase tracking-widest text-center">
                        Alphabet Mastered
                    </div>
                ) : (
                    <div className="text-[#495057] uppercase tracking-widest text-xs font-bold">
                        Target: <span className="text-[#212529] text-lg ml-2 display-font">{ASL_ALPHABET[currentLearningPathIndex]}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningPathPanel;
