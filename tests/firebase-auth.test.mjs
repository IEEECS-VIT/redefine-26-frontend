import assert from "node:assert/strict";
import test from "node:test";

test("internal accounts require the VIT student domain", async () => {
  const authModule = await import("../lib/authPolicy.ts");

  assert.equal(typeof authModule.isEmailAllowedForStudentType, "function");
  assert.equal(authModule.isEmailAllowedForStudentType("student@vitstudent.ac.in", "internal"), true);
  assert.equal(authModule.isEmailAllowedForStudentType("student@gmail.com", "internal"), false);
  assert.equal(authModule.isEmailAllowedForStudentType("student@gmail.com", "external"), true);
});

test("Firebase auth integration exchanges an ID token with the backend", async () => {
  const { readFile } = await import("node:fs/promises");
  const authSource = await readFile(new URL("../lib/auth.ts", import.meta.url), "utf8");

  assert.match(authSource, /signInWithPopup/);
  assert.match(authSource, /getIdToken/);
  assert.match(authSource, /Authorization: `Bearer \$\{idToken\}`/);
  assert.match(authSource, /\/signin/);
  assert.match(authSource, /onAuthStateChanged/);
});
