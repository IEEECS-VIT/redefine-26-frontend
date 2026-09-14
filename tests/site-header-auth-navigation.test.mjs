import assert from "node:assert/strict";
import test from "node:test";

test("signed-out header routes to Timeline, Tracks, and FAQ", async () => {
  const { getHeaderNavLinks } = await import("../components/Navigation/navigationLinks.ts");

  assert.deepEqual(
    getHeaderNavLinks(false).map(({ label, href }) => ({ label, href })),
    [
      { label: "Timeline", href: "/timeline" },
      { label: "Tracks", href: "/tracks" },
      { label: "FAQ", href: "/faq" },
    ],
  );
});

test("signed-in header routes to Timeline, Tracks, and Team", async () => {
  const { getHeaderNavLinks } = await import("../components/Navigation/navigationLinks.ts");

  assert.deepEqual(
    getHeaderNavLinks(true).map(({ label, href }) => ({ label, href })),
    [
      { label: "Timeline", href: "/timeline" },
      { label: "Tracks", href: "/tracks" },
      { label: "Team", href: "/team" },
    ],
  );
});

test("header action routes signed-out users to Sign In and signed-in users to Submit", async () => {
  const { getHeaderAction } = await import("../components/Navigation/navigationLinks.ts");

  assert.deepEqual(getHeaderAction(false), { label: "Sign In", href: "/register" });
  assert.deepEqual(getHeaderAction(true), { label: "Submit", href: "/submit" });
});
