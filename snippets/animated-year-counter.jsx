import { useEffect, useState } from "react";

export const YearsCounter({ startYear = 2018 }) {
  const currentYear = new Date().getFullYear();
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let current = 0;
    let interval = 50; // starting speed
    const total = currentYear - startYear;

    const step = () => {
      current += 1;
      setCount(current);

      // Slow down as we approach the final number
      if (current < total * 0.5) interval = 50;
      else if (current < total * 0.8) interval = 100;
      else interval = 200;

      if (current < total) {
        setTimeout(step, interval);
      } else {
        setPulse(true); // trigger pulse animation
      }
    };

    step();
  }, [currentYear, startYear]);

  return (
    <span
      style={{
        display: "inline-block",
        animation: pulse ? "pulse 0.6s ease-in-out 2" : "none",
      }}
    >
      {count} years (and counting...) in Software Engineering
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </span>
  );
}
