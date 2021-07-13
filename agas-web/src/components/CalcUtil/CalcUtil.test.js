import React from "react";
import { render } from "@testing-library/react";
import CalcUtil from "./CalcUtil";

describe("CalcUtil tests", () => {
  it("should render", () => {
    expect(render(<CalcUtil />)).toBeTruthy();
  });
});
