import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onCancel}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#111111] border border-[#1a1a1a] shadow-2xl p-8 slide-up overflow-hidden group">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#caf0f8]/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-[#caf0f8]/10 transition-colors duration-700"></div>
        
        <h2 className="text-2xl font-bold display-font mb-4 text-[#f8f9fa] tracking-tight">
          {title}
        </h2>
        
        <p className="text-[#a3a3a3] font-light leading-relaxed mb-8">
          {message}
        </p>
        
        <div className="flex gap-4 items-center justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-xs uppercase tracking-widest text-[#f8f9fa]/50 hover:text-[#f8f9fa] transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-[#f8f9fa] text-[#0a0a0a] text-xs uppercase tracking-widest font-bold hover:bg-[#caf0f8] transition-all duration-300 rounded-sm"
          >
            Confirm Reset
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#caf0f8]/20 to-transparent w-full"></div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
