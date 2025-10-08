"use client";
import confetti from "canvas-confetti";
import React, { PropsWithChildren } from "react";

export default function ButtonCelebrate({ children }: PropsWithChildren<{}>) {
  const handleClick = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white font-bold py-2 px-4 rounded-full z-50"
    >
      {children}
    </button>
  );
}
