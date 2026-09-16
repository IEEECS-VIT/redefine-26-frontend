export type ViewportSize = {
  width: number;
  height: number;
};

export const MOBILE_HOME_ARTWORK = {
  width: 402,
  height: 874,
} as const;

export const DESKTOP_HOME_ARTWORK = {
  width: 1512,
  height: 982,
} as const;

export function coverScale(viewport: ViewportSize, artwork: ViewportSize) {
  return Math.max(
    viewport.width / artwork.width,
    viewport.height / artwork.height,
  );
}

export function scaleArtworkLength(
  length: number,
  viewport: ViewportSize,
  artwork: ViewportSize,
) {
  return length * coverScale(viewport, artwork);
}

export function coverScaledLengthCss(length: number, artwork: ViewportSize) {
  const widthPercent = (length / artwork.width) * 100;
  const heightPercent = (length / artwork.height) * 100;

  return `max(${widthPercent.toFixed(6)}vw, ${heightPercent.toFixed(6)}dvh)`;
}
