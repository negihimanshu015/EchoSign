import React from 'react';

const ChallengePanel = ({ currentChallenge, currentChallengeStep }) => {
    return (
        <div className="border border-[#dee2e6] p-8 mt-8">
            <h3 className="display-font text-xl mb-6">Challenge Progress</h3>
            <div className="flex gap-4 mb-6">
                {currentChallenge.map((sign, index) => {
                    let styleClass = "border border-[#dee2e6] text-[#ced4da]";
                    if (index < currentChallengeStep) {
                        styleClass = "bg-[#212529] text-white"; // Completed
                    } else if (index === currentChallengeStep) {
                        styleClass = "bg-[#e9ecef] border border-[#212529] text-[#212529] font-bold"; // Active
                    }

                    return (
                        <div
                            key={index}
                            className={`w-12 h-12 flex items-center justify-center display-font text-xl ${styleClass}`}
                        >
                            {sign}
                        </div>
                    );
                })}
            </div>
            
            <div className="thin-line mb-6"></div>
            
            <div className="text-sm tracking-wide">
                {currentChallengeStep === currentChallenge.length ? (
                    <div className="text-[#212529] font-bold uppercase tracking-widest text-center">
                        Challenge Completed
                    </div>
                ) : (
                    <div className="text-[#495057] uppercase tracking-widest text-xs font-bold">
                        Target: <span className="text-[#212529] text-lg ml-2 display-font">{currentChallenge[currentChallengeStep]}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengePanel;
