import React from "react";

export default function GameModal({ GameComponent, onClose }: {GameComponent: React.ComponentType, onClose: () => void}) {
  if (!GameComponent) return null;

  return (
    <div onClick={onClose} style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
}}> 
        <button onClick={onClose} style={{
  position: "absolute",
  top: 20,
  right: 20
}}>X</button>
        <GameComponent />
      </div> 
  );
}
 
 