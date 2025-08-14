import React from "react";

export const QRateLogo = () => {
  return (
    <div className="inline-flex items-center space-x-0.5 font-sans border border-[#00205B] rounded-xl px-4 py-2 bg-white hover:bg-[#dedcdc] shadow-sm transition-colors duration-200 cursor-pointer">
      {/* q with checkmark */}
      <div className="relative text-[2rem] font-extrabold text-[#00205B] leading-none">
        <span className="block lowercase">q</span>
        {/* Yellow checkmark */}
        <svg
          className="absolute top-[-0.25rem] left-[0.45rem] w-[1rem] h-[1rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FDB913"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 10 18 4 12" />
        </svg>
      </div>

      {/* "Rate" text in red */}
      <div
        className="text-[2rem] font-extrabold text-[#d82929] leading-none tracking-tight"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        Rate
      </div>
    </div>
  );
};
