import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rain } from "../../components/Rain";
import { Tabs } from "../../TabContainer";
import { ImageWithTooltip } from "../../components/ImageWithTooltip";
import DrawingsService from "../../services/drawings_service";
import {Drawing} from "../../types/drawing"; 
import { getDrawingURL } from "../../utils/imageURL";
import drawZoomedImage from "../../components/drawZoomedImage";

export function DrawingPage({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) {
  const [drawingsPerYear, setDrawingsPerYear] = useState<{[year: number]: Drawing[]}>({});
  const [drawingYears, setDrawingYears] = useState<number[]>([]);
  const [drawingIndex, setDrawingIndex] = useState<number | null>(null);
  const [rotations, setRotations] = useState<{ [id: number]: number }>({});
 

  useEffect(() => { 
    DrawingsService.getDrawingsPerYear()
      .then((response) => {
        setDrawingsPerYear(response);
        setDrawingYears(Object.keys(response).map(Number).sort((a, b) => b - a));
      })
      .catch(() => {
        setDrawingsPerYear({});
        setDrawingYears([]);
      });
  }, []);
  useEffect(() => { 
  DrawingsService.getDrawingsPerYear()
    .then((response) => {
      setDrawingsPerYear(response);

      const years = Object.keys(response).map(Number).sort((a, b) => b - a);
      setDrawingYears(years);

      // generate stable rotations
      const newRotations: { [id: number]: number } = {};

      Object.values(response).flat().forEach((drawing) => {
        newRotations[drawing.id] = Math.random() * 10 - 5;
      });

      setRotations(newRotations);
    })
    .catch(() => {
      setDrawingsPerYear({});
      setDrawingYears([]);
    });
}, []);
  const allDrawings = drawingYears.flatMap(year => drawingsPerYear[year] || []);
  const goNext = () => {
    if (drawingIndex === null) return;
    setDrawingIndex((prev) =>
      prev !== null ? (prev + 1) % allDrawings.length : prev
    );
  };

  const goPrev = () => {
    if (drawingIndex === null) return;
    setDrawingIndex((prev) =>
      prev !== null
        ? (prev - 1 + allDrawings.length) % allDrawings.length
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
}, [drawingIndex, allDrawings.length]);
  return (
    <>
      <Rain dropCount={100} frontLayerOpacity={1} backLayerOpacity={0.5} />
      {drawingIndex !== null && 
      drawZoomedImage({drawing: allDrawings[drawingIndex],
      close: () => setDrawingIndex(null),
      goNext,
      goPrev})}
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
            <div style={{justifyContent:'center',marginBottom:'10px', display:'flex'}}>-----------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
            {drawingsPerYear[year] && drawingsPerYear[year]
            .map((drawing) => {
              const rotation = rotations[drawing.id] ?? 0;
                return (
                  <ImageWithTooltip
                    key={drawing.id}
                    drawURL={getDrawingURL(drawing.file_url)}
                    altText={drawing.title || `Drawing ${drawing.id}`}
                    rotation={rotation}
                    onClick={() => setDrawingIndex(allDrawings.indexOf(drawing))}
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
