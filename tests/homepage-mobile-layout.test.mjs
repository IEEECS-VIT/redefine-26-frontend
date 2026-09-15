import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const sideMenuPath = new URL("../components/Navigation/SideMenu.tsx", import.meta.url);
const navbarPath = new URL("../components/Navigation/Navbar.tsx", import.meta.url);
const backgroundPath = new URL("../components/Background/SplitBackground.tsx", import.meta.url);

test("homepage mobile navigation keeps words separated and letters compact", async () => {
  const source = await readFile(sideMenuPath, "utf8");

  assert.match(source, /data-home-menu-layout="responsive-sides"/);
  assert.match(source, /h-8 w-\[20px\]/);
  assert.match(source, /top-\[35%\]/);
});

test("homepage logo stays clear of the mobile title", async () => {
  const source = await readFile(navbarPath, "utf8");
  const background = await readFile(backgroundPath, "utf8");

  assert.match(source, /data-home-logo-layout="mobile-safe"/);
  assert.match(source, /h-9/);
  assert.match(source, /px-3 py-3/);
  assert.match(background, /object-cover object-top/);
});
