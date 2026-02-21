import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rain } from "../../components/Rain";
import { Tabs } from "../../TabContainer";
import { ImageWithTooltip } from "../../components/ImageWithTooltip";
import DrawingsService from "../../services/drawings_service";
import {Drawing} from "../../types/drawing"; 
import { getDrawingURL } from "../../utils/imageURL";

export function DrawingPage({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) {
  const [drawingsPerYear, setDrawingsPerYear] = useState<{[year: number]: Drawing[]}>({});
  const [drawingYears, setDrawingYears] = useState<number[]>([]);
  const [drawingExpanded, setDrawingExpanded] = useState<number | null>(null);
 

  useEffect(() => { 
    DrawingsService.getDrawingsPerYear()
      .then((response) => {
        setDrawingsPerYear(response);
        setDrawingYears(Object.keys(response).map(Number).sort((a, b) => b - a));
        console.log(drawingsPerYear)
      })
      .catch(() => {
        setDrawingsPerYear({});
        setDrawingYears([]);
      });
  }, []);


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
          gap: "20px",
          zIndex: 2,
          height: "90%",
          overflowY: "auto",
        }}
      >
        {drawingYears.map((year) => (
          <div key={year}>
            <h1 
              style={{display:'flex', justifyContent:"center"}}
            >{year}</h1>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
            {drawingsPerYear[year] && drawingsPerYear[year]
            .map((drawing) => {
                const rotation = Math.random() * 10 - 5;
                return (
                  <ImageWithTooltip
                    key={drawing.id}
                    drawURL={getDrawingURL(drawing.file_url)}
                    altText={drawing.title || `Drawing ${drawing.id}`}
                    rotation={rotation}
                    idx={drawing.id}
                  />
                );
              })}
          </div>
          </div>
        ))}
      </div>
    </>
  );
}
