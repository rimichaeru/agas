import React from "react";
import { render } from "@testing-library/react";
import AddProp from "./AddProp";

describe("AddProp tests", () => {
  it("should render", () => {
    expect(render(<AddProp />)).toBeTruthy();
  });
});
