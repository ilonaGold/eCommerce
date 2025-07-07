import { expect, afterEach } from "vitest";

// Setup for jsdom environment
afterEach(() => {
  // Clear DOM between tests
  document.body.innerHTML = "";
});
