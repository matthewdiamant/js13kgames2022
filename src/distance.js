export const distance = (source, dest) => {
  const dx = Math.abs(source.x - dest.x);
  const dy = Math.abs(source.y - dest.y);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};
