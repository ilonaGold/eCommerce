import { renderAbout } from "../../../views/renderAbout/renderAbout";

describe("renderAbout", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderAbout(parent)).not.toThrow();
  });
});
