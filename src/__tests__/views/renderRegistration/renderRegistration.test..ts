import { renderRegistration } from "../../../views/renderRegistration/renderRegistration";

describe("renderRegistration", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderRegistration(parent)).not.toThrow();
  });
});
