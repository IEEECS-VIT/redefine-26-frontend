import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL ?? "http://localhost:3000";

for (const route of ["/timeline", "/tracks", "/team-up", "/team", "/faq"]) {
  test(`${route} uses the shared Figma header and active nav thread`, async () => {
    const response = await fetch(`${baseUrl}${route}`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /data-site-header="figma-responsive"/);
    assert.match(html, /data-site-logo-size="56-88"/);
    assert.match(html, /data-site-register-size="120-210"/);
    assert.match(html, /data-site-register-layout="right-edge-responsive"/);
    assert.match(html, /data-site-header-fit="responsive-row"/);
    assert.equal((html.match(/data-nav-thread-component="active-nav"/g) ?? []).length, 1);
    assert.doesNotMatch(html, /rounded-full bg-pink-400/);
  });
}

test("timeline keeps its collage thread off desktop", async () => {
  const response = await fetch(`${baseUrl}/timeline`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal((html.match(/data-timeline-thread-component="desktop"/g) ?? []).length, 0);
});
