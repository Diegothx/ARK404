import { useEffect, useState } from "react";

const xTotal = 20;
const yTotal = 20;
const blockSize = 10;
const breakableBlocksWidth = 20;
const breakableBlocksHeight = 10;

interface GameState {
    grid: number[][];
    player: { x: number; y: number }[];
    ball: { x: number; y: number; dx: number; dy: number };
    running: boolean;
    }

function createGrid() {
  return Array.from({ length: yTotal }, (_, y) =>
    Array.from({ length: xTotal }, (_, x) => {
      const startX = Math.floor((xTotal - breakableBlocksWidth) / 2);
      const endX = startX + breakableBlocksWidth;

      const startY = 0;
      const endY = startY + breakableBlocksHeight;

      return x >= startX && x < endX && y >= startY && y < endY ? 1 : 0;
    })
  );
}

function updateGame(game: GameState): GameState {
  let { ball, player, grid, running } = game;

  let { x, y, dx, dy } = ball;

  let nextX = x + dx;
  let nextY = y + dy;

  // walls
  if (nextX < 0 || nextX >= xTotal) {
    dx *= -1;
    nextX = x + dx;
  }

  if (nextY < 0) {
    dy *= -1;
    nextY = y + dy;
  }

  // lose condition
  if (nextY >= yTotal) {
    return { ...game, running: false };
  }

  // player collision
  if (player.some(p => p.x === nextX && p.y === nextY)) {
    dy = -Math.abs(dy);
    nextY = y + dy;
  }

  // block collision
  let newGrid = grid;
  if (grid[nextY]?.[nextX] === 1) {
    newGrid = grid.map(row => [...row]);
    newGrid[nextY][nextX] = 0;
    dy *= -1;
  }

  return {
    ...game,
    ball: {
      x: x + dx,
      y: y + dy,
      dx,
      dy
    },
    grid: newGrid
  };
}

export default function Bricks() {
  const [game, setGame] = useState<GameState>(() => ({
    grid: createGrid(),
    player: [
      { x: xTotal / 2 - 1, y: yTotal - 1 },
      { x: xTotal / 2, y: yTotal - 1 },
      { x: xTotal / 2 + 1, y: yTotal - 1 }
    ],
    ball: {
      x: Math.floor(xTotal / 2),
      y: yTotal - 3,
      dx: Math.random() > 0.5 ? 1 : -1,
      dy: -1
    },
    running: false
  }));

  // 🎮 Game loop
useEffect(() => {
  if (!game.running) return;

  let lastTime = 0;
  const fps = 10; //  
  const interval = 1000 / fps;

  const loop = (time: number) => {
    if (time - lastTime >= interval) {
      setGame(prev => updateGame(prev));
      lastTime = time;
    }
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}, [game.running]);

  // 🎮 Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setGame(prev => {
        let newPlayer = prev.player;

        if (!prev.running) {
          return { ...prev, running: true };
        }

        if (e.key === "ArrowLeft") {
          if (prev.player.some(p => p.x - 1 < 0)) return prev;
          newPlayer = prev.player.map(p => ({ ...p, x: p.x - 1 }));
        }

        if (e.key === "ArrowRight") {
          if (prev.player.some(p => p.x + 1 >= xTotal)) return prev;
          newPlayer = prev.player.map(p => ({ ...p, x: p.x + 1 }));
        }

        return { ...prev, player: newPlayer };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Bricks</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${xTotal}, ${blockSize}px)`
        }}
      >
        {game.grid.map((row, y) =>
          row.map((cell, x) => {
            const isPlayer = game.player.some(p => p.x === x && p.y === y);
            const isBall = game.ball.x === x && game.ball.y === y;

            return (
              <div
                key={`${x}-${y}`}
                style={{
                  width: blockSize,
                  height: blockSize,
                  backgroundColor: isPlayer
                    ? "blue"
                    : cell === 1
                    ? "gray"
                    : isBall
                    ? "red"
                    : "lightgray",
                  border: "1px solid #333"
                }}
              />
            );
          })
        )}
      </div>

      <p>Use arrow keys to move</p>
    </div>
  );
}