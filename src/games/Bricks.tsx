import { useState, useEffect, useRef } from "react";

const xTotal = 20;
const yTotal = 20;
const blockSize = 10;
const breakableBlocksWidth = 20;
const breakableBlocksHeight = 10;

export default function Bricks() {
    const [mapGrid, setMapGrid] = useState(() => {
        return Array(xTotal).fill(null).map((_, y) =>
            Array(yTotal).fill(0).map((_, x) => {
                const startX = Math.floor((xTotal - breakableBlocksWidth) / 2);
                const endX = startX + breakableBlocksWidth;

                const startY = 0;
                const endY = startY + breakableBlocksHeight;

                if (x >= startX && x < endX && y >= startY && y < endY) {
                    return 1;
                }
                return 0;
            })
        );
    });
 
    const gridRef = useRef(mapGrid);
    useEffect(() => {
        gridRef.current = mapGrid;
    }, [mapGrid]);

    const [playerPos, setPlayerPos] = useState([
        { x: xTotal / 2 - 1, y: yTotal - 1 },
        { x: xTotal / 2, y: yTotal - 1 },
        { x: xTotal / 2 + 1, y: yTotal - 1 }
    ]);
    const playerRef = useRef(playerPos);

    useEffect(() => {
        playerRef.current = playerPos;
    }, [playerPos]);
    const [ball, setBall] = useState({
        x: Math.floor(xTotal / 2),
        y: yTotal - 3,
        dx: Math.random() > 0.5 ? 1 : -1,
        dy: -1
    });

    const [currentSide, setCurrentSide] = useState("bottom");
    const [gameStarted, setGameStarted] = useState(false);

    const movePlayer = (dx: number, dy: number) => {
        setPlayerPos(prev => {
            if (prev.some(pos => {
                const newX = pos.x + dx;
                const newY = pos.y + dy;
                return newX < 0 || newX >= xTotal || newY < 0 || newY >= yTotal;
            })) return prev;

            return prev.map(pos => ({
                x: Math.max(0, Math.min(xTotal - 1, pos.x + dx)),
                y: Math.max(0, Math.min(yTotal - 1, pos.y + dy))
            }));
        });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameStarted) setGameStarted(true);

            switch (e.key) {
                case "ArrowLeft":
                    if (currentSide === "bottom") movePlayer(-1, 0);
                    if (currentSide === "top") movePlayer(1, 0);
                    if (currentSide === "left") movePlayer(0, -1);
                    if (currentSide === "right") movePlayer(0, 1);
                    break;

                case "ArrowRight":
                    if (currentSide === "bottom") movePlayer(1, 0);
                    if (currentSide === "top") movePlayer(-1, 0);
                    if (currentSide === "left") movePlayer(0, 1);
                    if (currentSide === "right") movePlayer(0, -1);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSide, gameStarted]);

    useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
        setBall(prev => {
            let { x, y, dx, dy } = prev;

            let nextX = x + dx;
            let nextY = y + dy;

            const grid = gridRef.current;
            const player = playerRef.current; // ✅ use ref

            // WALLS
            if (nextX < 0 || nextX >= xTotal) {
                dx *= -1;
                nextX = x + dx;
            }

            if (nextY < 0) {
                dy *= -1;
                nextY = y + dy;
            }

            if (nextY >= yTotal) {
                setGameStarted(false);
                return prev;
            }

            // PLAYER COLLISION ✅ (using ref)
            const hitPlayer = player.some(p => p.x === nextX && p.y === nextY);
            if (hitPlayer) {
                dy = -Math.abs(dy);
                nextY = y + dy;
            }

            // BLOCKS (same as before)
            const blockOnXPath = grid[y]?.[nextX];
            const blockOnYAxis = grid[nextY]?.[x];
            const blockOnDiagonal = grid[nextY]?.[nextX];

            let hitX = null;
            let hitY = null;

            if (blockOnXPath === 1) {
                dx *= -1;
                hitX = nextX;
                hitY = y;
            } else if (blockOnYAxis === 1) {
                dy *= -1;
                hitX = x;
                hitY = nextY;
            } else if (blockOnDiagonal === 1) {
                dx *= -1;
                dy *= -1;
                hitX = nextX;
                hitY = nextY;
            }

            if (hitX !== null && hitY !== null) {
                setMapGrid(prev => {
                    const newGrid = prev.map(row => [...row]);
                    newGrid[hitY][hitX] = 0;
                    return newGrid;
                });
            }

            return {
                x: x + dx,
                y: y + dy,
                dx,
                dy
            };
        });
    }, 150);

    return () => clearInterval(interval);
}, [gameStarted]); 

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>Bricks</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${xTotal}, ${blockSize}px)`
            }}>
                {mapGrid.map((row, y) =>
                    row.map((cell, x) => {
                        const isPlayer = playerPos.some(pos => pos.x === x && pos.y === y);
                        const isBreakable = cell === 1;

                        return (
                            <div
                                key={`${x}-${y}`}
                                style={{
                                    width: blockSize,
                                    height: blockSize,
                                    backgroundColor:
                                        isPlayer ? "blue"
                                            : isBreakable ? "gray"
                                            : ball.x === x && ball.y === y ? "red"
                                            : "lightgray",
                                    border: "1px solid #333"
                                }}
                            />
                        );
                    })
                )}
            </div>

            <p>Use arrow keys to move!</p>
        </div>
    );
}