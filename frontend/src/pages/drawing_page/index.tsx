import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rain } from "../../components/Rain";
import { Tabs } from "../../TabContainer";
import { ImageWithTooltip } from "../../components/ImageWithTooltip";
import { Drawing, DrawingsService } from "../../api";
import {getImageURL} from "../../utils/imageURL";
export function DrawingPage({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [drawingYears, setDrawingYears] = useState<number[]>([]);
  const [drawingExpanded, setDrawingExpanded] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDrawings() {
      const years = await DrawingsService.getDrawingYearsDrawingsYearsGet();
      setDrawingYears(years);

      // Fetch drawings for all years in parallel
      const allDrawings = await Promise.all(
        years.map((year) =>
          DrawingsService.getDrawingsByYearDrawingsYearYearGet(year)
        )
      );

      // Flatten the array
      setDrawings(allDrawings.flat());
    }

    fetchDrawings();
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
            {drawings
              .filter((d) => (d.drawing_date && new Date(d.drawing_date).getFullYear() === year))
              .map((drawing) => {
                const rotation = Math.random() * 10 - 5;
                return (
                  <ImageWithTooltip
                    key={drawing.id}
                    drawURL={getImageURL(drawing.file_url)}
                    altText={drawing.title || `Drawing ${drawing.id}`}
                    rotation={rotation}
                    idx={drawing.id}
                  />
                );
              })}
          </div>
        ))}
      </div>
    </>
  );
}
