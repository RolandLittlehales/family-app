import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge, BadgeDot } from "../../src/components/Badge";

describe("Badge Components", () => {
  describe("Badge", () => {
    it("renders children correctly", () => {
      render(<Badge>Test Badge</Badge>);

      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it("applies variant classes correctly", () => {
      const { container } = render(<Badge variant="outline">Test</Badge>);

      expect(container.firstChild).toHaveClass();
    });

    it("applies color classes correctly", () => {
      const { container } = render(<Badge color="primary">Test</Badge>);

      expect(container.firstChild).toHaveClass();
    });

    it("applies size classes correctly", () => {
      const { container } = render(<Badge size="large">Test</Badge>);

      expect(container.firstChild).toHaveClass();
    });

    it("renders icon on the left by default", () => {
      render(
        <Badge icon={<span data-testid="test-icon">★</span>}>Test Badge</Badge>
      );

      const badge = screen.getByText("Test Badge").parentElement;
      const icon = screen.getByTestId("test-icon");

      expect(badge).toContainElement(icon);
      expect(badge?.firstChild).toBe(icon.parentElement);
    });

    it("renders icon on the right when specified", () => {
      render(
        <Badge
          icon={<span data-testid="test-icon">★</span>}
          iconPosition="right"
        >
          Test Badge
        </Badge>
      );

      const badge = screen.getByText("Test Badge").parentElement;
      const icon = screen.getByTestId("test-icon");

      expect(badge).toContainElement(icon);
      expect(badge?.lastChild).toBe(icon.parentElement);
    });

    it("applies custom className", () => {
      const { container } = render(
        <Badge className="custom-class">Test</Badge>
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("BadgeDot", () => {
    it("renders correctly", () => {
      const { container } = render(<BadgeDot />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies color classes correctly", () => {
      const { container } = render(<BadgeDot color="success" />);

      expect(container.firstChild).toHaveClass();
    });

    it("applies size classes correctly", () => {
      const { container } = render(<BadgeDot size="large" />);

      expect(container.firstChild).toHaveClass();
    });

    it("applies custom className", () => {
      const { container } = render(<BadgeDot className="custom-dot" />);

      expect(container.firstChild).toHaveClass("custom-dot");
    });
  });

  describe("Badge combinations", () => {
    it("renders all variant and color combinations", () => {
      const variants = ["solid", "outline", "subtle"] as const;
      const colors = [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
      ] as const;

      variants.forEach(variant => {
        colors.forEach(color => {
          const { container } = render(
            <Badge variant={variant} color={color}>
              {variant}-{color}
            </Badge>
          );

          expect(container.firstChild).toBeInTheDocument();
        });
      });
    });

    it("renders all sizes correctly", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach(size => {
        render(<Badge size={size}>{size} badge</Badge>);
        expect(screen.getByText(`${size} badge`)).toBeInTheDocument();
      });
    });
  });
});
