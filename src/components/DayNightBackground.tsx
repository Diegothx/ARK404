import { useEffect, useState } from "react";

export default function DayNightBackground({backgroundUrl}: {backgroundUrl: string}) {
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const hour = new Date().getHours();

    let startProgress = hour / 24; 

    const cycleDuration = 60_000 * 5;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;

      const cycleProgress = (startProgress + (elapsed / cycleDuration)) % 1;

      const newOpacity = 0.2 + 0.6 * ((Math.sin(cycleProgress * 2 * Math.PI) + 1) / 2);

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