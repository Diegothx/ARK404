import { JSX, useEffect, useState } from "react";

interface RainProps {
  dropCount?: number;
  frontLayerOpacity?: number;
  backLayerOpacity?: number;
  zIndex?: number;
  backLayerBottom?: string;
}

export function Rain({
  dropCount = 100,
  frontLayerOpacity = 1,
  backLayerOpacity = 0.5,
  backLayerBottom = "60px",
}: RainProps) {
  const [rainDrops, setRainDrops] = useState<{ front: JSX.Element[]; back: JSX.Element[] }>({
    front: [],
    back: [],
  });
  const [isRaining, setIsRaining] = useState(true);

  const makeItRain = () => {
    const increment = 0;
    const drops: JSX.Element[] = [];
    const backDrops: JSX.Element[] = [];
    let currentIncrement = increment;

    for (let i = 0; i < dropCount; i++) {
      const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
      const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
      currentIncrement += randoFiver;

      const dropStyle = {
        left: `${currentIncrement}%`,
        bottom: `${randoFiver + randoFiver - 1 + 100}%`,
        animationDelay: `0.${randoHundo}s`,
        animationDuration: `0.5${randoHundo}s`,
      };

      const dropBackStyle = {
        right: `${currentIncrement}%`,
        bottom: `${randoFiver + randoFiver - 1 + 100}%`,
        animationDelay: `0.${randoHundo}s`,
        animationDuration: `0.5${randoHundo}s`,
      };

      drops.push(
        <div className="drop" style={dropStyle} key={`drop-${i}`}>
          <div className="stem" style={dropStyle}></div>
        </div>
      );

      backDrops.push(
        <div className="drop" style={dropBackStyle} key={`back-drop-${i}`}>
          <div className="stem" style={dropBackStyle}></div>
        </div>
      );
    }

    setRainDrops({ front: drops, back: backDrops });
  };

  const startRain = () => {
    setIsRaining(true);
    makeItRain();
  };

  const stopRain = () => {
    setIsRaining(false);
    setRainDrops({ front: [], back: [] }); // remove all drops
  };

  useEffect(() => {
    if (isRaining) {
      makeItRain();
    } else {
      setRainDrops({ front: [], back: [] });
    }
  }, [dropCount, isRaining]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          opacity: frontLayerOpacity,
          overflow: "hidden",
          pointerEvents: 'none',
        }}
      >
        {rainDrops.front}
      </div>
      <div
        style={{
          position: "absolute",
          left: "0",
          width: "100%",
          height: "100%",
          bottom: backLayerBottom,
          opacity: backLayerOpacity,
          pointerEvents: 'none',
        }}
      >
        {rainDrops.back}
      </div>

      {isRaining ?
        <button onClick={stopRain} style={{ position: "fixed", bottom: 10, left: 10 }}>
          🌤️🎛️
        </button>
        :
      <button onClick={startRain} style={{ position: "fixed", bottom: 10, left: 10 }}>
          ☔🎛️
      </button>
       }
      
    </>
  );
}