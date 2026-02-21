import {Game} from "../types/game";

export default class GameService {
  static async getAllGames(): Promise<Game[]> {
    const response = await fetch('/ARK404/data/game.json'); 
    return response.json();
  }
}