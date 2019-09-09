import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/appointment/Index"

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
})