import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({
  className = "",
  showText = true,
  textSize = "md",
  variant = "light"
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Authentic Company Logo Image */}
      <div className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden border border-slate-200/60 bg-white shadow-sm transition-transform hover:scale-105 duration-300">
        <img
          src="/src/assets/images/shree_adishakti_solar_logo_1782724405534.jpg"
          alt="Shree Adishakti Solar"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dynamic Brand Text Label matches the logo typography */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center space-x-1.5">
            {/* Devanagari "श्री" prefix styled beautifully */}
            <span className="text-[15px] font-black font-sans bg-slate-900 text-white px-1.5 py-0.5 rounded-md leading-none">
              श्री
            </span>
            <span
              className={`font-black font-display tracking-tight uppercase leading-none ${
                isDark ? "text-white" : "text-slate-900"
              } ${
                textSize === "sm" ? "text-sm" : textSize === "lg" ? "text-xl" : "text-base"
              }`}
            >
              Adi Shakti <span className="text-[#F27D26]">Solar</span>
            </span>
          </div>
          <span
            className={`font-mono font-bold uppercase tracking-widest mt-0.5 text-left leading-none ${
              isDark ? "text-slate-400" : "text-slate-500"
            } ${
              textSize === "sm" ? "text-[8px]" : "text-[9px]"
            }`}
          >
            PVT. LTD. — BHUBANESWAR
          </span>
        </div>
      )}
    </div>
  );
}
