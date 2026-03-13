import { useState, useEffect } from "react";

const generateRandomColor = () => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
};

  const calculateDistance = (c1: {r: number, g: number, b: number}, c2: {r: number, g: number, b: number}) => {
    return Math.sqrt(
      Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
    );
  };
const MAX_DISTANCE = Math.round(Math.sqrt(255**2 + 255**2 + 255**2));

const calculateScore = (distance: number) => {
  const normalized = 1 - distance / MAX_DISTANCE;
  return Math.max(0, Math.round(normalized * 100));
};

export default function ColorGuessGame() {
  const [score, setScore] = useState(0);

  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
  const [selectedColor, setSelectedColor] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    setTargetColor(generateRandomColor());
  }, []);
  
  const submitGuess = () => {
    const distance = calculateDistance(targetColor, selectedColor);
    const roundScore = calculateScore(distance);

    setScore(roundScore);
    if(roundScore == 100){
      alert('Perfect Score!! ^^ Espero  que no habras hecho trampa ;) [It is watching you]')
    }else{
      alert(`Color objetivo: rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})
      Tu selección: rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})
      Puntuación: ${roundScore}/100 puntos`);
    }
    setTargetColor(generateRandomColor())
  };

  const inputStyle = {
    width: "100%",
    padding: "0px 10px",
    borderRadius: 6,
    border: "1px solid #ddd",
    fontSize: 16
  };

  return ( 
      <div onClick={(e)=>e.stopPropagation()} style={ {
    width: 520,
    padding: 24,
    borderRadius: 12, 
    justifyContent: "center",
    alignItems: "center", 
    background: "rgb(80, 19, 82)", 
    border: "5px solid white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.9)"
  }}>
        <h2 style={{ marginBottom: 10 }}>🎨 Color Guess</h2>
        <h3 style={{ marginBottom: 20 }}>Last Score: {score}</h3>

        {/* Target color */}
        <div
          style={{ 
            width: "100%",
            height: "200px",
            borderRadius: 10,
            marginBottom: 20,
            backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`
          }}
        />
        {/* Inputs */}
        <div style={{
          
    display: "flex",
    gap: 10,
    marginBottom: 20
        }}>
          R: <input
            type="number"
            min={0}
            max={255}
            placeholder="R"
            value={selectedColor.r}
            style={inputStyle}
            onChange={(e) =>
              setSelectedColor({ ...selectedColor, r: Number(e.target.value) })
            }
          />

          G: <input
            type="number"
            min={0}
            max={255}
            placeholder="G"
            value={selectedColor.g}
            style={inputStyle}
            onChange={(e) =>
              setSelectedColor({ ...selectedColor, g: Number(e.target.value) })
            }
          />

          B: <input
            type="number"
            min={0}
            max={255}
            placeholder="B"
            value={selectedColor.b}
            style={inputStyle}
            onChange={(e) =>
              setSelectedColor({ ...selectedColor, b: Number(e.target.value) })
            }
          />
        </div>

        <button style={{ 
          width: "100%",
          padding: 12,
          border: "none",
          borderRadius: 8,
          background: "#4f46e5",
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer"
        }} onClick={submitGuess}>
          Submit Guess
        </button>
      </div> 
  );
}