import {Game} from "../types/game";

export default class GameService {
  static async getAllGames(): Promise<Game[]> {
    const response = await fetch('/ARK404/data/game.json'); 
    return response.json();
  }
  static async getAllGamesByStatus(): Promise<{[status: string]: Game[]}> {
    const games = await this.getAllGames();
    const gamesByStatus: {[status: string]: Game[]} = {};
    games.forEach(game => {
      if (!gamesByStatus[game.status]) {
        gamesByStatus[game.status] = [];
      }
      gamesByStatus[game.status].push(game);
    });
    return gamesByStatus;
  }
}