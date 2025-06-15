export function getRandomColor(): string {
  const colors = ["#347433", "#FFC107", "#FF6F3C", "#B22222"];
  const angle = Math.floor(Math.random() * 360);
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  let color2;
  do {
    color2 = colors[Math.floor(Math.random() * colors.length)];
  } while (color1 === color2);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
