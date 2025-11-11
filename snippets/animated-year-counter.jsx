import { useEffect, useState } from "react";

export const AnimatedYearCounter = ({ startYear = 2016, label = "" }) => {
  const currentYear = new Date().getFullYear();
  const totalYears = currentYear - startYear;

  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [loopPulse, setLoopPulse] = useState(false);
  const [firework, setFirework] = useState(false);

  useEffect(() => {
    let current = 0;
    let interval = 50;

    const step = () => {
      current += 1;

      if (current < totalYears * 0.5) interval = 50;
      else if (current < totalYears * 0.8) interval = 100;
      else interval = 200;

      if (current < totalYears) {
        setCount(current);
        setTimeout(step, interval);
      } else {
        setCount(totalYears);
        setPulse(true);
        setTimeout(() => setLoopPulse(true), 4 * 300);
        setTimeout(() => setFirework(true), 300);
      }
    };

    step();
  }, [totalYears]);

  // Firework particle positions based on angle
  const particleCount = 12;
  const particleDistance = 40;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          display: "inline-block",
          fontWeight: "bold",
          transition: "transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out",
          transform: loopPulse ? "scale(1.05)" : "scale(1)",
          textShadow: loopPulse
            ? "0 0 5px #16A34A, 0 0 10px #07C983"
            : pulse
            ? "0 0 10px #16A34A, 0 0 20px #07C983"
            : "none",
          animation: pulse ? "pulse 0.6s ease-in-out 2" : "none",
        }}
      >
        {count} {label}
      </span>

      {firework &&
        Array.from({ length: particleCount }).map((_, i) => {
          const angle = (i / particleCount) * 2 * Math.PI;
          const x = Math.cos(angle) * particleDistance;
          const y = Math.sin(angle) * particleDistance;
          const color = ["#16A34A", "#07C983", "#A3E635"][i % 3];
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "6px",
                height: "6px",
                background: color,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                animation: `firework-${i} 0.6s ease-out forwards`,
              }}
            >
              <style>
                {`
                  @keyframes firework-${i} {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(${x}px, ${y}px) scale(0); opacity: 0; }
                  }
                `}
              </style>
            </span>
          );
        })}

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
};
