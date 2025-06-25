import { readFiltersFromUrl } from "../../../../views/renderProducts/helpers/readFiltersFromUrl";

describe("readFiltersFromUrl", () => {
  it("should not throw when called with a sample URL", () => {
    expect(() => readFiltersFromUrl()).not.toThrow();
  });
});
