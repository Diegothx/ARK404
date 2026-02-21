import { Drawing } from "../types/drawing";

export default class DrawingsService {
  static async getDrawingsPerYear(): Promise<{ [year: number]: Drawing[] }> {
    const response = await fetch('/ARK404/data/drawing.json');
    const drawings: Drawing[] = await response.json();
    console.log(drawings)
    const drawingsByYear: { [year: number]: Drawing[] } = {};
    drawings.forEach((drawing) => {
      if (drawing.drawing_date) {
        const year = new Date(drawing.drawing_date).getFullYear();
        if (!drawingsByYear[year]) {
          drawingsByYear[year] = [];
        }
        drawingsByYear[year].push(drawing);
      }
    });
    console.log(drawingsByYear)
    return drawingsByYear;
  }
  static async getDrawingsByGameId(gameId: number): Promise<Drawing[]> {
    const ganeDB = await fetch('/ARK404/data/game.json');
      const games: {id: number, collection_id?: number}[] = await ganeDB.json();
      const game = games.find(g => g.collection_id === gameId);
      if (!game) {
        console.error(`Game with collection_id ${gameId} not found.`);
        return [];
      }
    const collectionDB = await fetch('/ARK404/data/collection.json');
    const collections: {id: number, name: string, drawings: number[]}[] = await collectionDB.json();
    const collection = collections.find(c => c.id === game.collection_id);
    if (!collection) {
      console.error(`Collection with id ${game.collection_id} not found.`);
      return [];
    }
    const drawDB = await fetch('/ARK404/data/drawing.json');
    const drawings: Drawing[] = await drawDB.json();
    const filteredDrawings = drawings.filter(d => collection.drawings.includes(d.id)); 
    return filteredDrawings;
  }
}