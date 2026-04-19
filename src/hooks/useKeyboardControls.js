import { useEffect } from "react";

export function useKeyboardControls(direction, setDirection) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") {
        setDirection("UP");
      }
      if (e.key === "ArrowDown" && direction !== "UP") {
        setDirection("DOWN");
      }
      if (e.key === "ArrowLeft" && direction !== "RIGHT") {
        setDirection("LEFT");
      }
      if (e.key === "ArrowRight" && direction !== "LEFT") {
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, setDirection]);
}