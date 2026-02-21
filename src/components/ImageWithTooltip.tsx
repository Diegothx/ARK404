import { useState } from "react";

export function ImageWithTooltip({
  width = "300px",
  drawURL,
  rotation,
  altText,
  idx,
}: {
  width?: string;
  drawURL: string;
  rotation: number;
  altText: string;
  idx: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
 
  return (
    <div
      style={{ position: "relative",
          width: `${width}`, display: "inline-block" }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        key={idx}
        src={drawURL}
        alt={altText}
        style={{ 
          width: `${width}`,
          height: "auto",
          objectFit: "contain",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.3s ease",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "rotate(0deg) scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = `rotate(${rotation}deg)`)
        }
      />
      {showTooltip && (
        <span
          style={{
            position: "absolute",
            bottom: "105%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "6px",
            padding: "4px 8px",
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {altText}
        </span>
      )}
    </div>
  );
}
