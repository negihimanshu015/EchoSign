import React from 'react';

const ProgressInfo = ({ completedLetters, accuracy }) => {
    return (
        <div className="border border-[#dee2e6] p-8">
            <h3 className="display-font text-xl mb-6">Performance</h3>
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <div className="text-xs uppercase tracking-widest text-[#868e96] mb-2">Mastered</div>
                    <div className="text-4xl display-font font-bold text-[#212529]">
                        {completedLetters.length}
                    </div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-widest text-[#868e96] mb-2">Accuracy</div>
                    <div className="text-4xl display-font font-bold text-[#212529]">
                        {accuracy}%
                    </div>
                </div>
            </div>

            <div className="thin-line mb-6"></div>

            <div>
                <h4 className="text-xs uppercase tracking-widest text-[#495057] mb-4 font-bold">Best Practices</h4>
                <ul className="space-y-3 text-[#6c757d] font-light text-sm">
                    <li className="flex gap-4"><span className="text-[#adb5bd] font-bold">—</span> Practice in good lighting conditions</li>
                    <li className="flex gap-4"><span className="text-[#adb5bd] font-bold">—</span> Keep your hand centered in frame</li>
                    <li className="flex gap-4"><span className="text-[#adb5bd] font-bold">—</span> Hold each sign for 2 seconds</li>
                </ul>
            </div>
        </div>
    );
};

export default ProgressInfo;
