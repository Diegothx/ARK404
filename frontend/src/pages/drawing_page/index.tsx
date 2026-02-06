import { Dispatch, SetStateAction } from "react";
import { Rain } from "../../components/Rain";
import { Tabs } from "../../TabContainer";
import { ImageWithTooltip } from "../../components/ImageWithTooltip";

export function DrawingPage({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) {
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
          margin: "0px 20px",
          padding: "30px 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          zIndex: "2",
          height: "90%",
          overflowY: "auto",
        }}
      >
        {[].map((draw, idx) => {
          const rotation = Math.random() * 10 - 5;
          return <ImageWithTooltip draw={draw} rotation={rotation} idx={idx} key={idx} />;
        })}
      </div>
    </>
  );
}