import { useEffect, useRef, useState } from "react";
import "../css/GameCanvas.css";
import { moveSnake } from "../utils/movement";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { generateFood } from "../utils/food";
import { checkCollision } from "../utils/collision";
import ScoreBoard from "./ScoreBoard";

const CELL_SIZE = 20;
const GRID_SIZE = 30;

// 🔹 Initial snake (clean reuse)
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

function GameCanvas() {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("dark");

  // 🎮 Keyboard controls
  useKeyboardControls(direction, setDirection);

  const toggleTheme = () => {
  setTheme((prev) => (prev === "dark" ? "light" : "dark"));
};

  // 🔁 Game loop
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const { newSnake, ateFood } = moveSnake(
          prevSnake,
          direction,
          food
        );

        const newHead = newSnake[0];

        // 💀 collision
        if (checkCollision(newHead, newSnake, GRID_SIZE)) {
          setIsGameOver(true);
          return prevSnake;
        }

        // 🍎 food eaten
        if (ateFood) {
          setFood(generateFood(GRID_SIZE, newSnake));
          setScore((prev) => prev + 1);
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver]);

  // 🎨 Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 🍎 draw food
    ctx.fillStyle = "red";
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // 🐍 draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#2e7d32" : "#66bb6a";
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    // 💀 Game Over text
    if (isGameOver) {
      ctx.fillStyle = "black";
      ctx.font = "40px Arial";
      ctx.fillText(
        "Game Over",
        canvas.width / 3,
        canvas.height / 2
      );
    }
  }, [snake, food, isGameOver]);

  // 🔄 Restart game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection("RIGHT");
    setFood(generateFood(GRID_SIZE, INITIAL_SNAKE));
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className={`game-container ${theme}`}>
  <button className="theme-toggle" onClick={toggleTheme}>
  <span className={`icon sun ${theme === "light" ? "active" : ""}`}>
    ☀️
  </span>
  <span className={`icon moon ${theme === "dark" ? "active" : ""}`}>
    🌙
  </span>
</button>

  <ScoreBoard
    score={score}
    onRestart={resetGame}
    isGameOver={isGameOver}
  />

  <canvas
    ref={canvasRef}
    width={GRID_SIZE * CELL_SIZE}
    height={GRID_SIZE * CELL_SIZE}
    className="game-canvas"
  />
</div>

  );
}

export default GameCanvas;