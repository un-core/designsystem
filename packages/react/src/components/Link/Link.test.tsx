//import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Link from "./Link";

describe("Link Component", () => {
  // Test basic rendering
  it("renders a link", () => {
    render(<Link href="https://example.com">Visit Example</Link>);
    expect(screen.getByRole("link")).toHaveTextContent("Visit Example");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  // Test disabled link
  it("renders a disabled link", () => {
    render(<Link disabled>Disabled Link</Link>);
    expect(screen.getByText("Disabled Link")).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  // Test inline link
  it("renders an inline link", () => {
    render(<Link inline>Inline Link</Link>);
    expect(screen.getByText("Inline Link")).toHaveClass("wfp--link--inline");
  });

  // Test visited link
  it("renders a visited link", () => {
    render(<Link visited>Visited Link</Link>);
    expect(screen.getByText("Visited Link")).toHaveClass("wfp--link--visited");
  });

  // Test different sizes of links
  it("renders a small link", () => {
    render(<Link size="sm">Small Link</Link>);
    expect(screen.getByText("Small Link")).toHaveClass("wfp--link--sm");
  });

  it("renders a medium link", () => {
    render(<Link size="md">Medium Link</Link>);
    expect(screen.getByText("Medium Link")).toHaveClass("wfp--link--md");
  });

  it("renders a large link", () => {
    render(<Link size="lg">Large Link</Link>);
    expect(screen.getByText("Large Link")).toHaveClass("wfp--link--lg");
  });

  // Test link with icon
  it("renders a link with an icon", () => {
    const MockIcon = () => <svg data-testid="mock-icon"></svg>;
    render(<Link icon={<MockIcon />}>Link with Icon</Link>);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("Link with Icon")).toBeInTheDocument();
  });

  // Test custom class name
  it("applies custom class names", () => {
    const customClass = "my-custom-class";
    render(<Link className={customClass}>Custom Class Link</Link>);
    expect(screen.getByText("Custom Class Link")).toHaveClass(customClass);
  });

  // Test keyboard interaction
  /*
  TODO: Fix this test https://github.com/testing-library/user-event/issues/820
  it("handles keyboard events", () => {
    render(<Link href="https://example.com">Keyboard Link</Link>);
    userEvent.tab();
    expect(screen.getByText("Keyboard Link")).toHaveFocus();
  });
  */

  // Test rel attribute for security when target is "_blank"
  it("adds rel='noopener' when target='_blank'", () => {
    render(
      <Link href="https://example.com" target="_blank">
        External Link
      </Link>
    );
    expect(screen.getByText("External Link")).toHaveAttribute(
      "rel",
      "noopener"
    );
  });

  // Snapshot test
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Link href="https://example.com">Snapshot Link</Link>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
