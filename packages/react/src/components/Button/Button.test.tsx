import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  // Test basic rendering
  it("renders a button", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  // Test small and large variants
  it("renders a small button", () => {
    render(<Button small>Small Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("wfp--btn--sm");
  });

  it("renders a large button", () => {
    render(<Button large>Large Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("wfp--btn--lg");
  });

  // Test href prop
  it("renders an anchor when href is provided", () => {
    render(<Button href="https://example.com">Link</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  // Test onClick event
  it("handles onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  // Test if the button is disabled when the 'disabled' prop is passed
  it("renders a disabled button", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  // Test custom class name
  it("applies custom class names", () => {
    const customClass = "my-custom-class";
    render(<Button className={customClass}>Custom Class Button</Button>);
    expect(screen.getByRole("button")).toHaveClass(customClass);
  });

  // Test different kinds of buttons
  it("applies the primary kind class", () => {
    render(<Button kind="primary">Primary Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("wfp--btn--primary");
  });

  // Test tabIndex prop
  it("sets tabIndex when provided", () => {
    const tabIndex = 3;
    render(<Button tabIndex={tabIndex}>Tab Indexed Button</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "tabIndex",
      tabIndex.toString()
    );
  });

  // Test large and small props together
  it("does not apply both large and small classes together", () => {
    render(
      <Button large small>
        Conflicting Sizes Button
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("no-prefix--btn--lg");
    expect(button).not.toHaveClass("no-prefix--btn--sm");
  });

  // Test with children and icon
  it("renders children and icon together", () => {
    const MockIcon = () => <svg data-testid="mock-icon"></svg>;
    render(<Button icon={<MockIcon />}>Button with Icon</Button>);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Button with Icon");
  });

  // Snapshot test
  it("matches snapshot", () => {
    const { asFragment } = render(<Button>Snapshot Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  // Test mouse events
  it("handles mouse events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Mock icon as a simple SVG
const MockIcon = () => <svg data-testid="mock-icon"></svg>;

describe("Button Component with Icon", () => {
  // Test icon rendering when icon is a React node
  it("renders a button with an icon as a React node", () => {
    render(<Button icon={<MockIcon />}>Button with Icon</Button>);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();
  });

  // Test icon rendering when icon is a component type
  it("renders a button with an icon as a component type", () => {
    render(<Button icon={MockIcon}>Button with Component Icon</Button>);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();
  });

  // Test iconReverse prop
  it("renders with icon reverse", () => {
    const MockIcon = () => <svg data-testid="mock-icon"></svg>;
    render(
      <Button icon={MockIcon} iconReverse>
        Icon Reverse Button
      </Button>
    );

    const button = screen.getByRole("button");
    const icon = screen.getByTestId("mock-icon");
    expect(button.firstChild).toBe(icon);
  });
});
