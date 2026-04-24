import { useEffect, useState } from 'react';

const SuccessOverlay = ({ letter, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 300); // Allow exit animation
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/60 backdrop-blur-md animate-success-flash">
      <div className="flex flex-col items-center slide-up">
        <div className="text-9xl font-bold text-[#caf0f8] display-font mb-4">{letter}</div>
        <div className="w-16 h-16 rounded-full bg-[#caf0f8] flex items-center justify-center">
          <svg className="w-10 h-10 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SuccessOverlay;
