//import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InfoBar from "./InfoBar";

describe("InfoBar Component", () => {
  // Test basic rendering
  it("renders the InfoBar with content", () => {
    render(<InfoBar>Important Information</InfoBar>);
    expect(screen.getByText("Important Information")).toBeInTheDocument();
  });

  // Test custom class name
  it("applies custom class names", () => {
    const customClass = "my-custom-class";
    render(<InfoBar className={customClass}>Important Information</InfoBar>);
    expect(screen.getByText("Important Information").parentNode).toHaveClass(
      customClass
    );
  });

  // Test id attribute
  it("sets id when provided", () => {
    const id = "info-bar-id";
    render(<InfoBar id={id}>Important Information</InfoBar>);
    expect(
      screen.getByText("Important Information").parentNode
    ).toHaveAttribute("id", id);
  });

  // Test different page widths
  it("renders with specified page width", () => {
    const pageWidth = "lg";
    render(<InfoBar pageWidth={pageWidth}>Important Information</InfoBar>);
    // Assuming the pageWidth prop affects the class of the Wrapper component
    expect(screen.getByText("Important Information")).toHaveClass(
      `wfp--wrapper--width-${pageWidth}`
    );
  });

  // Snapshot test
  it("matches snapshot", () => {
    const { asFragment } = render(<InfoBar>Snapshot InfoBar</InfoBar>);
    expect(asFragment()).toMatchSnapshot();
  });
});
