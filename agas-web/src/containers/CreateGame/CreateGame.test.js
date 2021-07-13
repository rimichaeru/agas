import React from "react";
import { render } from "@testing-library/react";
import CreateGame from "./CreateGame";

describe("CreateGame tests", () => {
  it("should render", () => {
    expect(render(<CreateGame />)).toBeTruthy();
  });
});
