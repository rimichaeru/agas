import React from "react";
import { render } from "@testing-library/react";
import Test from "./Test";

describe("Test tests", () => {
  it("should render", () => {
    expect(render(<Test />)).toBeTruthy();
  });
});
