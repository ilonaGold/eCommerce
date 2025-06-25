import { renderHome } from "../../../views/renderHome/renderHome";

describe("renderHome", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderHome(parent)).not.toThrow();
  });
});
