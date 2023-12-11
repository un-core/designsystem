// import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Wrapper from "./Wrapper";

describe("Wrapper Component", () => {
  // Test basic rendering
  it("renders the Wrapper with content", () => {
    render(<Wrapper>Content</Wrapper>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  // Test different page widths
  it.each(["xs", "sm", "md", "lg", "full", "narrow", "narrower", "narrowest"])(
    "renders with specified page width '%s'",
    (pageWidth: any) => {
      render(<Wrapper pageWidth={pageWidth}>Content</Wrapper>);

      expect(screen.getByText("Content")).toHaveClass(
        `wfp--wrapper--width-${pageWidth}`
      );
    }
  );

  // Test mobile page width
  it.each(["sm", "md", "lg", "full"])(
    "renders with specified mobile page width '%s'",
    (mobilePageWidth: any) => {
      render(<Wrapper mobilePageWidth={mobilePageWidth}>Content</Wrapper>);
      if (mobilePageWidth === "full") {
        expect(screen.getByText("Content")).toHaveClass(
          `wfp--wrapper--width-mobile-full`
        );
      }
    }
  );

  // Test spacing
  it.each(["md", "xl"])(
    "renders with specified spacing '%s'",
    (spacing: any) => {
      render(<Wrapper spacing={spacing}>Content</Wrapper>);
      expect(screen.getByText("Content")).toHaveClass(
        `wfp--wrapper--spacing-${spacing}`
      );
    }
  );

  // Test background themes
  it.each(["lighter", "dark"])(
    "renders with specified background theme '%s'",
    (background: any) => {
      render(<Wrapper background={background}>Content</Wrapper>);
      expect(screen.getByText("Content")?.parentNode).toHaveClass(
        `wfp--wrapper--background-${background}`
      );
    }
  );

  // Test custom class name
  it("applies custom class names", () => {
    const customClass = "my-custom-class";
    render(<Wrapper className={customClass}>Content</Wrapper>);
    expect(screen.getByText("Content")).toHaveClass(customClass);
  });

  // Test custom background class name
  it("applies custom background class names", () => {
    const backgroundClass = "my-background-class";
    render(
      <Wrapper background="dark" backgroundClassName={backgroundClass}>
        Content
      </Wrapper>
    );
    expect(screen.getByText("Content")?.parentNode).toHaveClass(
      backgroundClass
    );
  });

  // Test custom background styles
  it("applies custom background styles", () => {
    const backgroundStyle = { backgroundColor: "red" };
    render(<Wrapper backgroundStyle={backgroundStyle}>Content</Wrapper>);
    expect(screen.getByText("Content")?.parentNode).toHaveStyle(
      backgroundStyle
    );
  });

  // Snapshot test
  it("matches snapshot", () => {
    const { asFragment } = render(<Wrapper>Snapshot Wrapper</Wrapper>);
    expect(asFragment()).toMatchSnapshot();
  });
});
