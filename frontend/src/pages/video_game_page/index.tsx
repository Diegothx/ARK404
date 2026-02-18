import { useState, JSX, useEffect, Dispatch, SetStateAction } from "react";
import { Tabs } from "../../TabContainer";
import { Rain } from "../../components/Rain"; 
import { GameService, GameResponse, GameStatus} from "../../api";

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
 
  const selectedGame = gameList.find((g) => g.id === currentGameId);
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
            </>
        )}
        </div>
      </div>
    </>
  );
}
