import { useEffect, useState } from "react";
import { LandingPage } from "./pages/landing_page";
import { HealthService } from "./api";
export enum Tabs {
  LANDING = "landing",
  //BLOG = "blog",
  //COOKING = "cooking",
  //GARDERING = "gardering",
  //CODE = "code",
  //UNIVERSITY = "university",
  //ROBOTIC = "robotic",
  //VIDEOGAME = "videogame",
  //DRAWING = "drawing",
  //HOMESERVER = "homeserver",
}

export enum ServerHealthStatus {
  HEALTHY = "healthy",           // Both backend and BDD are up
  BDD_DOWN = "bdd_down",         // Backend up, BDD down
  BACKEND_DOWN = "backend_down", // Backend down
  UNKNOWN = "unknown"            // Status cannot be determined
}

export function TabContainer() {
  const [serverHealth, setServerHealth] = useState<ServerHealthStatus>(ServerHealthStatus.UNKNOWN);
  const [currentTab, setCurrentTab] = useState(Tabs.LANDING);
  const [isAdminMode, ] = useState(true);

  useEffect(() => {
    HealthService.rootGet()
      .then((response) => {
        console.log("Health check response:", response);
        setServerHealth(ServerHealthStatus.HEALTHY);
      })
      .catch((error) => {
        console.error("Health check failed:", error);
        setServerHealth(ServerHealthStatus.BACKEND_DOWN);
      });
  }, []);
  return (
    <div
      style={{
        position: "relative",
        alignContent: "center",
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(10deg, rgb(5, 2, 19) 0%, rgb(9, 9, 66) 80%, #1d385f 100%)",
      }}
    >
      {currentTab == Tabs.LANDING && (
        <LandingPage setCurrentTab={setCurrentTab} serverHealth={serverHealth} isAdminMode={isAdminMode} />
      )}
    </div>
  );
}
