export type TimelinePoint = {
  x: number;
  y: number;
};

const tidy = (value: number) => Number(value.toFixed(1));

export function buildTimelineThreadPath(
  points: TimelinePoint[],
  stageWidth: number,
): string {
  if (points.length < 2) return "";

  const segments = points.slice(1).map((point, index) => {
    const previous = points[index];
    const verticalDistance = point.y - previous.y;
    const midpoint = {
      x: tidy((previous.x + point.x) / 2),
      y: tidy((previous.y + point.y) / 2),
    };

    const side = index % 2 === 0 ? 1 : -1;
    const controlX = tidy(stageWidth * (side > 0 ? 0.85 : 0.15));
    const bendX = tidy(midpoint.x + side * stageWidth * 0.12);
    return [
      `C ${controlX} ${tidy(previous.y + verticalDistance * 0.22)} ${controlX} ${tidy(midpoint.y - verticalDistance * 0.22)} ${bendX} ${midpoint.y}`,
      `C ${tidy(midpoint.x - side * stageWidth * 0.12)} ${tidy(midpoint.y + verticalDistance * 0.22)} ${controlX} ${tidy(point.y - verticalDistance * 0.22)} ${tidy(point.x)} ${tidy(point.y)}`,
    ].join(" ");
  });

  return `M ${tidy(points[0].x)} ${tidy(points[0].y)} ${segments.join(" ")}`;
}
