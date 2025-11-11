// yearsCounter.js
(function() {
  const elements = document.querySelectorAll(".years-counter");

  elements.forEach(el => {
    const startYear = parseInt(el.dataset.startYear) || 2018;
    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - startYear;

    let start = null;
    const duration = 2000; // smooth count duration

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      const eased = easeOutQuad(Math.min(progress, 1));
      const value = Math.floor(eased * totalYears);

      el.textContent = value + " years (and counting...) in Software Engineering";

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Initial pulse + glow
        el.style.transition = "transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out";

        const pulseGlow = [
          { scale: 1.2, shadow: "0 0 10px #16A34A, 0 0 20px #07C983" },
          { scale: 1, shadow: "0 0 0px #16A34A" },
          { scale: 1.2, shadow: "0 0 10px #16A34A, 0 0 20px #07C983" },
          { scale: 1, shadow: "0 0 0px #16A34A" },
        ];

        pulseGlow.forEach((step, index) => {
          setTimeout(() => {
            el.style.transform = `scale(${step.scale})`;
            el.style.textShadow = step.shadow;
          }, index * 300);
        });

        // Looping subtle pulse after animation
        setTimeout(() => {
          setInterval(() => {
            el.style.transform = "scale(1.05)";
            el.style.textShadow = "0 0 5px #16A34A, 0 0 10px #07C983";
            setTimeout(() => {
              el.style.transform = "scale(1)";
              el.style.textShadow = "0 0 0px #16A34A";
            }, 300);
          }, 1000);
        }, pulseGlow.length * 300);
      }
    }

    requestAnimationFrame(animate);
  });
})();
