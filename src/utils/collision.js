export function checkCollision(head, snake, gridSize) {
  // wall collision
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= gridSize ||
    head.y >= gridSize
  ) {
    return true;
  }

  // self collision (skip head at index 0)
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}