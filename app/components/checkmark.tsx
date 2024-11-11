import React from "react";

export const Checkmark = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16"
    >
      <path
        d="M16 32 L28 44 L48 20"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="5"
        strokeLinecap="round"
        className="animate-draw"
        strokeDasharray={100}
        strokeDashoffset={100}
      />
    </svg>
  );
};
