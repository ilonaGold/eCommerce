export function getRandomColor(): string {
  const colors = [
    "#DFFF00",
    "#FFBF00",
    "#FF7F50",
    "#DE3163",
    "#9FE2BF",
    "#40E0D0",
    "#6495ED",
    "#CCCCFF",
  ];
  const angle = Math.floor(Math.random() * 360);
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  let color2;
  do {
    color2 = colors[Math.floor(Math.random() * colors.length)];
  } while (color1 === color2);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
