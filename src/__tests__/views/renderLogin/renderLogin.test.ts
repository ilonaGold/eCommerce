import { renderLogin } from "../../../views/renderLogin/renderLogin";

describe("renderLogin", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderLogin(parent)).not.toThrow();
  });
});
