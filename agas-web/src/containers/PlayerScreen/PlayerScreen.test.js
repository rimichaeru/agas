import React from "react";
import { render } from "@testing-library/react";
import PlayerScreen from "./PlayerScreen";

describe("PlayerScreen tests", () => {
  it("should render", () => {
    expect(render(<PlayerScreen />)).toBeTruthy();
  });
});
