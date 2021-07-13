import React from "react";
import { render } from "@testing-library/react";
import DiceUtil from "./DiceUtil";

describe("DiceUtil tests", () => {
  it("should render", () => {
    expect(render(<DiceUtil />)).toBeTruthy();
  });
});
