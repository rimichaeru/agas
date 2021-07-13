import React from "react";
import { render } from "@testing-library/react";
import GameScreen from "./GameScreen";

describe("GameScreen tests", () => {
  it("should render", () => {
    expect(render(<GameScreen />)).toBeTruthy();
  });
});
