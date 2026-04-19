export function moveSnake(snake, direction, food) {
  const head = snake[0];
  const newHead = { ...head };

  if (direction === "RIGHT") newHead.x += 1;
  if (direction === "LEFT") newHead.x -= 1;
  if (direction === "UP") newHead.y -= 1;
  if (direction === "DOWN") newHead.y += 1;

  const newSnake = [newHead, ...snake];

  // check if food eaten
  const ateFood = newHead.x === food.x && newHead.y === food.y;

  if (!ateFood) {
    newSnake.pop(); // normal move
  }

  return { newSnake, ateFood };
}