interface legendPositions {
  xAxis: [string, string, string, string, string];
  yAxis: [string, string, string, string, string];
}
export const legendPositions: legendPositions = {
  xAxis: ["11", "12", "13", "14", "15"],
  yAxis: ["11", "21", "31", "41", "51"],
};
export const flags: string[] = [
  "Very Low",
  "Low",
  "Medium",
  "High",
  "Very High",
];

export const findColor: (num: number) => string = (num) => {
  const greens = [1, 2, 3, 4];
  const oranges = [10, 12];
  const yellows = [8, 9, 6, 5];
  const reds = [15, 20, 25, 16];

  let color = "";
  if (greens?.includes(num)) color = "lime";
  if (oranges?.includes(num)) color = "orange";
  if (yellows?.includes(num)) color = "yellow";
  if (reds?.includes(num)) color = "red";
  return color;
};
