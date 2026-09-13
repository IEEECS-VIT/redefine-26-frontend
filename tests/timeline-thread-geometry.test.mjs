import assert from "node:assert/strict";
import test from "node:test";

import { buildTimelineThreadPath } from "../components/Timeline/timelineThreadGeometry.ts";

test("responsive timeline thread passes through every measured pin", () => {
  const pins = [
    { x: 120, y: 80 },
    { x: 310, y: 140 },
    { x: 280, y: 360 },
    { x: 90, y: 410 },
  ];

  const path = buildTimelineThreadPath(pins, 400);

  assert.match(path, /^M 120 80 /);
  for (const pin of pins.slice(1)) {
    assert.match(path, new RegExp(`${pin.x} ${pin.y}(?: |$)`));
  }
  assert.ok((path.match(/C /g) ?? []).length >= (pins.length - 1) * 2);
});

test("mobile timeline thread alternates its curves while retaining pin endpoints", () => {
  const pins = [
    { x: 201, y: 100 },
    { x: 201, y: 250 },
    { x: 201, y: 400 },
  ];

  const path = buildTimelineThreadPath(pins, 402);
  assert.match(path, /^M 201 100 /);
  assert.match(path, /201 250/);
  assert.match(path, /201 400$/);
  assert.equal((path.match(/C /g) ?? []).length, 4);
});

test("timeline thread returns no path until at least two pins are measurable", () => {
  assert.equal(buildTimelineThreadPath([], 400), "");
  assert.equal(buildTimelineThreadPath([{ x: 20, y: 30 }], 400), "");
});
