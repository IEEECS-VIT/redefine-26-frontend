import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const tracksPath = new URL("../components/Tracks/TracksSection.tsx", import.meta.url);

test("desktop subtrack text stays in the clear space below the fan", async () => {
  const source = await readFile(tracksPath, "utf8");

  assert.match(source, /data-desktop-subtracks-layout="below-fan"/);
  assert.match(source, /h-\[13rem\] xl:h-\[15rem\]/);
  assert.match(source, /density="desktop"/);
  assert.match(source, /data-track-side-decoration="left"/);
  assert.match(source, /hoveredIdx === null \? "opacity-100" : "opacity-0"/);
});
