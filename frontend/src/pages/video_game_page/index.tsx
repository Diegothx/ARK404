import { useState, JSX, useEffect, Dispatch, SetStateAction } from "react";
import { Tabs } from "../../TabContainer";
import { Rain } from "../../components/Rain"; 

const colorByStatus = (
  status: "Playing" | "Finished" | "Fully Finished" | "Not Applicable" | "Backlog",
) => {
  switch (status) {
    case "Playing":
      return "#ffcc00";
    case "Finished":
      return "#00cc66";
    case "Fully Finished":
      return "rgb(2, 140, 2)";
    case "Not Applicable":
      return "#660000";
    case "Backlog":
      return "#f1f1f1";
    default:
      return "#000000";
  }
};
const statusOrder = {
  Playing: 4,
  "Not Applicable": 3,
  Backlog: 5,
  Finished: 2,
  "Fully Finished": 1,
};

export function VideoGamePage({
  setCurrentTab,
  isAdminMode
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
  isAdminMode?: boolean;
}) {
  const [rainDrops, setRainDrops] = useState<{
    front: JSX.Element[];
    back: JSX.Element[];
  }>({ front: [], back: [] });
  const [entries, setEntries] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<string>();

  const sortedGameData = entries.slice().sort((a, b) => {
    return (
      statusOrder[a.status as keyof typeof statusOrder] -
      statusOrder[b.status as keyof typeof statusOrder]
    );
  });

  const currentGameData = entries.find((g) => g.title === currentGame);

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
        <div style={{ overflowY: "auto", width: "40%", zIndex: "1" }}>
          {sortedGameData.map((g) => (
            <h2
              key={g.title}
              onClick={() => setCurrentGame(g.title)}
              style={{
                color: colorByStatus(
                  g.status as
                    | "Playing"
                    | "Finished"
                    | "Fully Finished"
                    | "Not Applicable"
                    | "Backlog",
                ),
                cursor: "pointer",
              }}
            >
              {currentGame === g.title && ">"} {g.title}
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
        >
          {currentGameData && (
            <>
              <h1 style={{ textAlign: "center" }}>
                {" "}
                &gt; {currentGameData.title} &lt;
              </h1>
              <h3 style={{ textAlign: "center" }}>-- Tags --</h3>
              <div
                style={{ display: "flex", gap: "20px", padding: "0px 20px" }}
              >
                {currentGameData.genre.map((g) => (
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
