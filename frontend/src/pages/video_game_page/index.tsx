import { useState, JSX, useEffect, Dispatch, SetStateAction } from "react";
import { Tabs } from "../../TabContainer";
import { Rain } from "../../components/Rain"; 
import { GameService, GameResponse, GameStatus, Drawing, DrawingsService} from "../../api";
import { ImageWithTooltip } from "../../components/ImageWithTooltip";
import { getImageURL } from "../../utils/imageURL";

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
    default:
      return "#000000";
  }
}; 
const statusOrder: Record<GameStatus, number> = { 
  finished_100: 0,
  finished_dlc: 1,
  finished_main: 2,
  playing: 3,
  on_hold: 4,
  next_up: 5,
  installed: 6,
  backlog: 7,
  wishlist: 8,
  soft_dropped: 9,
  dropped: 10,
};

export function VideoGamePage({
  setCurrentTab
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) { 
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [gameList, setGameList] = useState<GameResponse[]>([]);
  const [currentGameDrawings, setCurrentGameDrawings] = useState<Drawing[]>([])

  const selectedGame = gameList.find((g) => g.id === currentGameId);
  
  useEffect(() => {
    async function fetchGames() {
      const games = await GameService.listGamesGamesGet();
      games.sort((a, b) => {
        const statusA = a.status || "backlog";
        const statusB = b.status || "backlog";
        return statusOrder[statusA] - statusOrder[statusB];
      });
      setGameList(games);
    }
    fetchGames();
  }, []);  
 

 useEffect(() => {
    async function fetchDrawings() {
      if (selectedGame != null && selectedGame.collection_id != null) {
        const drawings = await DrawingsService.getDrawingsByCollectionDrawingsCollectionsCollectionIdGet(selectedGame.collection_id);
        setCurrentGameDrawings(drawings);
      }
    }
    fetchDrawings();
  }, [selectedGame]);

  return (
    <> 
      <Rain/>
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
          margin: "0px 50px",
          height: "90%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          position: "relative", 
        }}
      > 
        <div style={{ overflowY: "auto", width: "40%", zIndex: "1", 
           }}>
            {gameList.map((g) => (
            <h2
              key={g.title}
              onClick={() => setCurrentGameId(g.id)}
              style={{
                color: colorByStatus(g.status || "backlog" as GameStatus),
                cursor: "pointer",
              }}
            >
              {currentGameId === g.id && ">"} {g.title}
            </h2>
          ))}
        </div>
        <div
          style={{
            width: "40%",
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
                {" "}
                &gt; {selectedGame.title} &lt;
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
              {selectedGame.notes != undefined && (
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
                  <h3 style={{ textAlign: "center" }}>-- Galeria --</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {currentGameDrawings.map((draw, idx) => {
                      const rotation = Math.random() * 10 - 5;
                      return (
                        <ImageWithTooltip
                          key={idx}
                          drawURL={getImageURL(draw.file_url)}
                          rotation={rotation}
                          altText={draw.title || `Drawing ${draw.id}`}
                          idx={idx}
                        />
                      );
                    })}
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
