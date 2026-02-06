import { useEffect, useState } from "react";
import { LandingPage } from "./pages/landing_page";
import {DrawingPage} from "./pages/drawing_page";
import {VideoGamePage} from "./pages/video_game_page";
import { HealthService } from "./api";
export enum Tabs {
  LANDING = "landing",
  DRAWING = "drawing",
  VIDEOGAME = "videogame",
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
  const [showIcons, setShowIcons] = useState(false);
 
  useEffect(() => {
    HealthService.rootGet()
      .then((response) => {
        setServerHealth(ServerHealthStatus.HEALTHY);
      })
      .catch((error) => {
        setServerHealth(ServerHealthStatus.BACKEND_DOWN);
      });
  }, []);
  return (
    <div
      style={{ 
        alignContent: "center",
        overflow: "scroll",
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(10deg, rgb(5, 2, 19) 0%, rgb(9, 9, 66) 80%, #1d385f 100%)",
      }}
    >
      {currentTab == Tabs.LANDING && (
        <LandingPage setCurrentTab={setCurrentTab} serverHealth={serverHealth} showIcons={showIcons} setShowIcons={setShowIcons}/>
      )}
      {currentTab == Tabs.DRAWING && 
      <DrawingPage setCurrentTab={setCurrentTab} 
      />}
      {currentTab == Tabs.VIDEOGAME &&
      <VideoGamePage setCurrentTab={setCurrentTab}
      />}
     {/*  {currentTab == Tabs.BLOG && <BlogPage setCurrentTab={setCurrentTab} />} */}
      {/* {currentTab == Tabs.COOKING && <CookingPage setCurrentTab={setCurrentTab} />} */}
    </div>
  );
}
