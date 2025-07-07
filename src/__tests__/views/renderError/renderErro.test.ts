import { renderError } from "../../../views/renderError/renderError";

describe("renderError", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderError(parent)).not.toThrow();
  });
});
