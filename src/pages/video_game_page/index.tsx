import { useState,  useEffect, Dispatch, SetStateAction } from "react";
import { Tabs } from "../../TabContainer";
import { Rain } from "../../components/Rain";  
import { ImageWithTooltip } from "../../components/ImageWithTooltip";
import { getDrawingURL } from "../../utils/imageURL";
import GameService from "../../services/game_service";
import DrawingsService from "../../services/drawings_service"; 
import { Drawing } from "../../types/drawing";
import { Game, GameStatus } from "../../types/game";
import drawZoomedImage from "../../components/drawZoomedImage";

const colorByStatus = (
  status: GameStatus,
) => {
  switch (status) {
    case "playing":
      return "#ffcc00";
    case "finished_main":
      return "#00cc66";
    case "finished_100":
      return "rgb(2, 140, 2)";
 
    case "backlog":
      return "#f1f1f1";
    case "casual":
      return "#ff99cc";
    default:
      return "#000000";
  }
}; 
const statusTitles: {[status in GameStatus]: string} = {
  "playing": "Jugando",
  "finished_main": "Terminado (Main)",
  "finished_100": "Terminado (100%)",
  "on_hold": "En espera",
  "casual": "Casual",
  "backlog": "Pendiente",
  "wishlist": "Deseado",
  "dropped": "Abandonado"
}

const statusOrder: GameStatus[] = [
  GameStatus.finished_100,
  GameStatus.finished_main,
  GameStatus.playing,
  GameStatus.on_hold,
  GameStatus.casual,
  GameStatus.backlog,
  GameStatus.wishlist,
  GameStatus.dropped
];

export function VideoGamePage({
  setCurrentTab
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) { 
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [gameList, setGameList] = useState<{[status: string]: Game[]}>({});
  const [currentGameDrawings, setCurrentGameDrawings] = useState<Drawing[]>([])
  const [drawingIndex, setDrawingIndex] = useState<number | null>(null);

  const selectedGame = Object.values(gameList).flat().find((g) => g.id === currentGameId);
  
  useEffect(() => {
    async function fetchGamesByStatus() {
      const games = await GameService.getAllGamesByStatus(); 
      setGameList(games);
    }
    fetchGamesByStatus();
  }, []);  
 

 useEffect(() => {
    async function fetchDrawings() {
      if (selectedGame != null && selectedGame.collection_id != null) {
        const drawings = await DrawingsService.getDrawingsByGameId(selectedGame.collection_id);
        setCurrentGameDrawings(drawings);
      } else{
        setCurrentGameDrawings([]);
      }
    }
    fetchDrawings();
  }, [selectedGame]);

  const goNext = () => {
    if (drawingIndex === null) return;
    setDrawingIndex((prev) =>
      prev !== null ? (prev + 1) % currentGameDrawings.length : prev
    );
  };

  const goPrev = () => {
    if (drawingIndex === null) return;
    setDrawingIndex((prev) =>
      prev !== null
        ? (prev - 1 + currentGameDrawings.length) % currentGameDrawings.length
        : prev
    );
  };

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (drawingIndex === null) return;

    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "Escape") setDrawingIndex(null);
  };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawingIndex, currentGameDrawings.length]);
  return (
    <> 
      <Rain/> 
      {drawingIndex !== null && 
      drawZoomedImage({drawing: currentGameDrawings[drawingIndex],
      close: () => setDrawingIndex(null),
      goNext,
      goPrev})}
      <div > 
        <h1
          onClick={() => setCurrentTab(Tabs.LANDING)}
          style={{
            display: "inline-flex",
            margin: "0px 50px",
            position: "relative",
            cursor: "pointer",
            color: "white",
          }}
        >
          {"< "}Volver
        </h1>
      </div>
      <div
        style={{
          margin: "0px auto", 
          height: "90%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          position: "relative",
          width:'1152px', 
        }}
      > 
        <div style={{ overflowY: "auto", width: "40%", zIndex: "1", 
           }}>
            {statusOrder
            .filter(status => gameList[status]?.length > 0)
            .map((status) => {
              const games = gameList[status];
              if (!games) return null;

              return (
                <div key={status}>
                  <h2 style={{ color: colorByStatus(status), textAlign: "center" }}>
                    ------------ {statusTitles[status]} ------------
                  </h2>

                  {games.map((g) => (
                    <h2
                      key={g.title}
                      onClick={() => setCurrentGameId(g.id)}
                      style={{
                        color: colorByStatus(g.status || "backlog"),
                        cursor: "pointer",
                      }}
                    >
                      {currentGameId === g.id && ">"} {g.title}
                    </h2>
                  ))}
                </div>
              );
            })}
        </div>
        <div
          style={{
            width: "60%",
            borderRadius: "20px",
            border: "5px double purple",
            zIndex: "1",
            height: "100%",
            backgroundColor: "rgba(53, 6, 59, 0.3)",
            overflow:'auto'
          }}
        > {selectedGame && (
            <>
              <h1 style={{ textAlign: "center" }}>
             {selectedGame.link ? (
              <a
                href={selectedGame.link}
                target="_blank"
                rel="noopener noreferrer"
            className="game-link" 
                 
              >
                &gt; {selectedGame.title} <span style={{fontSize:"10px", position:'absolute', right:'18px', top: '8px'}}>↗</span> &lt;
              </a>
            ) : (
              <span style={{ opacity: 0.7 }}>
                &gt; {selectedGame.title} &lt;
              </span>
            )}
            </h1>
              <h3 style={{ textAlign: "center" }}>-- Tags --</h3>
              <div
                style={{ display: "flex", gap: "20px", padding: "0px 20px" }}
              >
                {selectedGame.genre?.map((g) => (
                  <div
                    key={g}
                    style={{
                      backgroundColor: "#ff00cf30",
                      borderRadius: "15px",
                      padding: "10px",
                      border: "2px solid #ff00cf80",
                    }}
                  >
                    {g}
                  </div>
                ))}
              </div>
              {selectedGame.notes!=null && selectedGame.notes.length > 0 && (
                <div style={{ margin: "20px" }}>
                  <h3 style={{ textAlign: "center" }}>-- Notas --</h3>
                  <div
                    style={{
                      display:'flex', flexDirection:'column',  
                    }}
                  >
                    {selectedGame.notes.map((note, idx) => { 
                          return (
                            <h4 key={idx}>
                              {"> "}
                              {note.content}
                            </h4>
                          );
                        })} 
                  </div>
                </div>
              )}
              {currentGameDrawings.length > 0 && (
                <div style={{ margin: "20px" }}>
                  <h3 style={{ textAlign: "center" }}>-- Art Gallery --</h3>
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      gridTemplateColumns:
                        "repeat(auto-fit, 153px)",
                      gap: "10px",
                    }}
                  >
                    {currentGameDrawings.map((draw, idx) => {
                      const rotation = Math.random() * 10 - 5;
                      return (
                        <ImageWithTooltip
                          width={"100%"}
                          key={idx}
                          drawURL={getDrawingURL(draw.file_url)}
                          rotation={rotation}
                          altText={draw.title || `Drawing ${draw.id}`}
                          onClick={() => setDrawingIndex(idx)}
                          idx={idx}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Related Links + Comments */}
              {selectedGame.relatedLinks && selectedGame.relatedLinks.length > 0 && (
                <div style={{ margin: "20px" }}>
                  <h3 style={{ textAlign: "center" }}>-- Related Links --</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {selectedGame.relatedLinks.map((link, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: "2px solid #ff00cf50",
                          borderRadius: "12px",
                          padding: "10px",
                          backgroundColor: "#ff00cf10",
                        }}
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontWeight: "bold", color: "#ff00cf" }}
                        >
                          {link.title} ({link.type})
                        </a>

                        {link.comments && link.comments.length > 0 && (
                          <div style={{ marginTop: "8px", paddingLeft: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
                            {link.comments.map((comment, cidx) => (
                              <span key={cidx} style={{ fontSize: "0.9em", opacity: 0.8 }}>
                                - {comment}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
        )}
        </div>
      </div>
    </>
  );
}
