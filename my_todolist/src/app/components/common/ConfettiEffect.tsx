"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiEffectProps {
  trigger: boolean; // kích hoạt khi true
  duration?: number; // thời gian chạy confetti (ms)
}

export const ConfettiEffect = ({ trigger, duration = 3000 }: ConfettiEffectProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        gravity={0.3}
        wind={0.01}
        recycle={false}
      />
    </div>
  );
};
