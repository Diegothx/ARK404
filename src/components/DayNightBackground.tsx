import { useEffect, useState } from "react";

export default function DayNightBackground({backgroundUrl}: {backgroundUrl: string}) {
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    // 1️⃣ Get user hour at load
    const hour = new Date().getHours(); // 0–23

    // Map hour to initial cycle progress (0–1)
    // We'll consider 0 = midnight, 0.5 = noon
    let startProgress = hour / 24; 

    const cycleDuration = 60_000; // full loop duration in ms (e.g., 1 minute)
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;

      // progress: 0–1, using elapsed + start offset
      const cycleProgress = (startProgress + (elapsed / cycleDuration)) % 1;

      // Sine wave for smooth fade: peaks at day, lowest at night
      // scale opacity between 0.2 (night) and 1 (day)
      const newOpacity = 0.2 + 0.8 * Math.sin(cycleProgress * 2 * Math.PI);

      setOpacity(newOpacity);

      requestAnimationFrame(animate);
    }

    const frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        backgroundImage: `url("${backgroundUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(5px)",
        opacity: opacity,
        transition: "opacity 0.1s linear",
      }}
    />
  );
}