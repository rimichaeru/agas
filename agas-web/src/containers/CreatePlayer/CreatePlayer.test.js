import React from "react";
import { render } from "@testing-library/react";
import CreatePlayer from "./CreatePlayer";

describe("CreatePlayer tests", () => {
  it("should render", () => {
    expect(render(<CreatePlayer />)).toBeTruthy();
  });
});
