import { Drawing } from "../types/drawing";
import { getDrawingURL } from "../utils/imageURL";

export default function drawZoomedImage({drawing, close, goNext, goPrev}: {drawing: Drawing, close: () => void, goNext: () => void, goPrev: () => void}) {
  return (
    <div
    onClick={ (e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      
    }}
    >
    <div style={{ display: 'inline-block', textAlign: 'center', alignItems:'center' }}
    
    onClick={ (e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}>
  <img
    src={getDrawingURL(drawing.file_url)}
    alt={drawing.title || `Drawing ${drawing.id}`} 
    style={{border:'10px double purple', maxWidth: '80vw', maxHeight: '70vh', objectFit: 'contain', marginBottom:'20px'}}
  />

  <p style={{ color: 'white', marginTop: '10px', maxWidth: '70vw',       }}> 

    {drawing.drawing_date && (
      <>
        {new Date(drawing.drawing_date).toLocaleDateString('es-CL')}
      </>
    )}

    {drawing.description && (
      <> 
        {". " + drawing.description}
      </>
    )}
  </p>
  <button
  onClick={goPrev}
  style={{
    position: "absolute",
    left: "100px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "5rem",
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
>
  ←
</button>

<button
  onClick={goNext}
  style={{
    position: "absolute",
    right: "100px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "5rem",
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
>
  →
</button>
</div>
    </div>
  );
}