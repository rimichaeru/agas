import React from "react";
import { render } from "@testing-library/react";
import NewProp from "./NewProp";

describe("NewProp tests", () => {
  it("should render", () => {
    expect(render(<NewProp />)).toBeTruthy();
  });
});
