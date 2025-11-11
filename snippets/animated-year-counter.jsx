import { useEffect, useState } from "react";

export const AnimatedYearCounter = ({ startYear = 2016, label = "" }) => {
  const currentYear = new Date().getFullYear();
  const totalYears = currentYear - startYear;

  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [loopPulse, setLoopPulse] = useState(false);
  const [particles, setParticles] = useState([]);

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
        setTimeout(() => generateParticles(), 200);
      }
    };

    step();
  }, [totalYears]);

  const generateParticles = () => {
    const particleCount = 40;
    const colors = ["#16A34A", "#07C983", "#A3E635", "#FACC15", "#F472B6"];

    const newParticles = Array.from({ length: particleCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 60 + 20;
      const size = Math.random() * 6 + 4;
      const delay = Math.random() * 400;
      const duration = Math.random() * 800 + 600;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size,
        delay,
        duration,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      };
    });
    setParticles(newParticles);
  };

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          display: "inline-block",
          fontWeight: "bold", // <-- make text bold
          transition: "transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out",
          transform: loopPulse ? "scale(1.05)" : "scale(1)",
          textShadow: loopPulse
            ? "0 0 5px #16A34A, 0 0 10px #07C983"
            : pulse
            ? "0 0 10px #16A34A, 0 0 20px #07C983"
            : "none",
          animation: pulse ? "ayc-pulse 0.6s ease-in-out 2" : "none",
        }}
      >
        {count} {label}
      </span>

      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="ayc-confetti"
            style={{
              "--x": `${p.x}px`,
              "--y": `${p.y}px`,
              "--size": `${p.size}px`,
              "--delay": `${p.delay}ms`,
              "--duration": `${p.duration}ms`,
              "--color": p.color,
              "--rotate": `${p.rotation}deg`,
            }}
          />
        ))}
      </span>

      <style>
        {`
          @keyframes ayc-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }

          .ayc-confetti {
            position: absolute;
            left: 50%;
            top: 50%;
            width: var(--size);
            height: var(--size);
            background-color: var(--color);
            border-radius: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
            animation: ayc-bump var(--duration) ease-out var(--delay) forwards;
          }

          @keyframes ayc-bump {
            0% {
              transform: translate(-50%, -50%) translate(0,0) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) translate(calc(var(--x)/2), calc(var(--y)/2)) rotate(calc(var(--rotate)/2));
              opacity: 0.7;
            }
            100% {
              transform: translate(-50%, -50%) translate(var(--x), var(--y)) rotate(var(--rotate));
              opacity: 0;
            }
          }
        `}
      </style>
    </span>
  );
};
