import React from "react";
// @ts-ignore
import logoImg from "../assets/images/shree_adishakti_solar_logo_1782724405534.jpg";

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
    <div className={`flex items-center space-x-2.5 sm:space-x-3 select-none py-1 ${className}`}>
      {/* Authentic Company Logo Image - Full, uncropped, contain-fit */}
      <div className="shrink-0 flex items-center justify-center">
        <img
          src={logoImg}
          alt="Shree Adishakti Solar"
          className="h-[40px] xs:h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Restored Brand Text Label */}
      {showText && (
        <div className="flex flex-col select-none leading-none">
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {/* Devanagari "श्री" prefix styled beautifully */}
            <span className="text-[11px] sm:text-[13px] md:text-[14px] font-black font-sans bg-slate-900 text-white px-1.5 py-0.5 rounded-md leading-none">
              श्री
            </span>
            <span
              className={`font-black font-display tracking-tight uppercase leading-none ${
                isDark ? "text-white" : "text-slate-900"
              } ${
                textSize === "sm" ? "text-xs sm:text-sm" : textSize === "lg" ? "text-lg sm:text-xl" : "text-sm sm:text-base md:text-lg"
              }`}
            >
              Adi Shakti <span className="text-[#F27D26]">Solar</span>
            </span>
          </div>
          <span
            className={`font-mono font-bold uppercase tracking-widest mt-1 text-left leading-none ${
              isDark ? "text-slate-400" : "text-slate-500"
            } ${
              textSize === "sm" ? "text-[7px]" : "text-[8px] sm:text-[9px]"
            }`}
          >
            PVT. LTD. — BHUBANESWAR
          </span>
        </div>
      )}
    </div>
  );
}
