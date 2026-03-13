import { Dispatch, SetStateAction, useState } from "react";
import { Rain } from "../../components/Rain";
import { Tabs } from "../../TabContainer";
import { games } from "../../games";
import GameModal from "../../components/GameModal";

export function WebGamesPage({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) {
  const [activeGame, setActiveGame] = useState<React.ComponentType | null>(null);

  return (
    <>
      <Rain dropCount={100} frontLayerOpacity={1} backLayerOpacity={0.5} />

      <h1
        onClick={() => setCurrentTab(Tabs.LANDING)}
        style={{
          margin: "0px 50px",
          position: "relative",
          cursor: "pointer",
          color: "white",
        }}
      >
        {"< "}Volver
      </h1>

      <div
        style={{
          margin: "0px 80px",
          padding: "30px 0",
          gap: "20px",
          zIndex: 2,
          height: "90%",
          overflowY: "auto",  
        }}
      >
        <h1 style={{display:'flex', justifyContent:"center"}}>Web "Games" for when I am bored</h1>
 <div style={{justifyContent:'center',marginBottom:'10px', display:'flex'}}>-----------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
            
        <div style={{ display: "flex", gap: 10, zIndex: 3, justifyContent:"center", position: 'relative'  }}>
          {games.map((game) => (
            <button 
            key={game.id}
            disabled={!game.isAvailabe}
            onClick={() => setActiveGame(() => game.component)}
            title={game.description}
            style={{
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              width: 100,
              height: 130,
              borderRadius: 10,
              overflow: "hidden",
              color:"black"
            }}>
              <img src={game.thumbnail || "public/images/webDisplay/webgames.svg"}  alt={game.name} style={{ width: 100, height: 100}} />
              <span>{game.name}</span>
            </button>
          ))}
        </div>
          {activeGame && (<GameModal
            GameComponent={activeGame}
            onClose={() => setActiveGame(null)}
          />)}
      </div>
    </>
  );
}