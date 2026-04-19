export function generateFood(gridSize, snake) {
  while (true) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);

    const isOnSnake = snake.some(
      (segment) => segment.x === x && segment.y === y
    );

    if (!isOnSnake) {
      return { x, y };
    }
  }
}