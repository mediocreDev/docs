import React, { useEffect, useState } from "react";

// Ease-out cubic function for fast start, slow end
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function ExperienceCounter({ startYear = 2016, duration = 2 }) {
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;

  const [count, setCount] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * years));

      // Scale pulse effect
      setScale(1 + 0.2 * (1 - easedProgress));

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [years, duration]);

  return (
    <span
      style={{
        fontWeight: "bold",
        color: "#4f46e5",
        display: "inline-block",
        transform: "scale(" + scale + ")",
        transition: "transform 0.1s",
      }}
    >
      {count} {count === years ? "years (and counting...)" : "years"}
    </span>
  );
}
