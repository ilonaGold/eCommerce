import { renderUserProfile } from "../../../views/renderUserProfile/renderUserProfile";

describe("renderUserProfile", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderUserProfile(parent)).not.toThrow();
  });
});
