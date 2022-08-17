export const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + (rect2.size || rect2.sizeX) &&
  rect1.x + (rect1.size || rect1.sizeX) > rect2.x &&
  rect1.y < rect2.y + (rect2.size || rect2.sizeY) &&
  (rect1.size || rect1.sizeY) + rect1.y > rect2.y;

export const pointCollision = (rect, point) =>
  point.x >= rect.x &&
  point.x < rect.x + (rect.size || rect.sizeX) &&
  point.y >= rect.y &&
  point.y < rect.y + (rect.size || rect.sizeY);
