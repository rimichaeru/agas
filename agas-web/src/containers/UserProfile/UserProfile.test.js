import React from "react";
import { render } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile tests", () => {
  it("should render", () => {
    expect(render(<UserProfile />)).toBeTruthy();
  });
});
