import { describe, it, expect } from "vitest";
import { isLastPage, nextPageIndex, getPageText } from "../engine/dialogue.js";

const dialogue = { speaker: "TEST", pages: ["one", "two", "three"] };

describe("dialogue flow", () => {
  it("reports the last page correctly", () => {
    expect(isLastPage(dialogue, 0)).toBe(false);
    expect(isLastPage(dialogue, 2)).toBe(true);
  });

  it("advances but never overruns the page list", () => {
    expect(nextPageIndex(dialogue, 0)).toBe(1);
    expect(nextPageIndex(dialogue, 2)).toBe(2);
  });

  it("returns the text for a given page", () => {
    expect(getPageText(dialogue, 1)).toBe("two");
    expect(getPageText(dialogue, 99)).toBe("three");
  });
});
