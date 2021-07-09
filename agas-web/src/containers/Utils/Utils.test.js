import React from "react";
import { render } from "@testing-library/react";
import Utils from "./Utils";

describe("Utils tests", () => {
  it("should render", () => {
    expect(render(<Utils />)).toBeTruthy();
  });
});
