import React from "react";
import { render } from "@testing-library/react";
import Dice from "./Dice";

describe("Dice tests", () => {
  it("should render", () => {
    expect(render(<Dice />)).toBeTruthy();
  });
});
