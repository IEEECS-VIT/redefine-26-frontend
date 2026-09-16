import assert from "node:assert/strict";
import test from "node:test";

import {
  DESKTOP_HOME_ARTWORK,
  MOBILE_HOME_ARTWORK,
  coverScale,
  scaleArtworkLength,
} from "../lib/homeArtwork.ts";

test("desktop menu labels scale by the same cover factor as the artwork", () => {
  const laptopSizes = [
    { width: 1024, height: 768 },
    { width: 1280, height: 720 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1536, height: 864 },
    { width: 1920, height: 1080 },
  ];

  for (const viewport of laptopSizes) {
    const scale = coverScale(viewport, DESKTOP_HOME_ARTWORK);

    assert.equal(
      scaleArtworkLength(56, viewport, DESKTOP_HOME_ARTWORK),
      56 * scale,
    );
    assert.equal(
      scaleArtworkLength(40, viewport, DESKTOP_HOME_ARTWORK),
      40 * scale,
    );
  }
});

test("cover scaling follows the limiting viewport dimension", () => {
  assert.equal(
    coverScale({ width: 1024, height: 768 }, DESKTOP_HOME_ARTWORK),
    768 / 982,
  );
  assert.equal(
    coverScale({ width: 1920, height: 1080 }, DESKTOP_HOME_ARTWORK),
    1920 / 1512,
  );
  assert.equal(
    coverScale({ width: 390, height: 844 }, MOBILE_HOME_ARTWORK),
    390 / 402,
  );
});
