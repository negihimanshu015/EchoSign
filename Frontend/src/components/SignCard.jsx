import { signInstructions } from '../data/aslData';

const SignCard = ({ letter, onManualConfirm }) => {
  const instructions = signInstructions[letter];
  const isMotion = instructions?.isMotion;

  return (
    <div className="bg-[#111111] border border-[#1a1a1a] p-6 h-full flex flex-col">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#525252] font-bold">Target Sign</span>
        <div className="text-9xl font-bold text-[#f8f9fa] no -font mt-1 text-center">{letter}</div>
        {isMotion && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#caf0f8]/10 border border-[#caf0f8]/20 rounded-full">
            <div className="w-2 h-2 bg-[#caf0f8] rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-[#caf0f8]">Motion Sign</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <section>
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] font-bold mb-4">Instructions</h4>
          <ul className="space-y-4">
            {instructions?.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-[15px] text-[#f8f9fa] font-light leading-relaxed">
                <span className="text-[#737373] font-bold">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </section>

        {instructions?.commonMistakes && !isMotion && (
          <section>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#737373] font-bold mb-4">Common Mistakes</h4>
            <ul className="space-y-3">
              {instructions.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-sm text-[#737373] font-light italic">
                  {mistake}
                </li>
              ))}
            </ul>
          </section>
        )}

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
