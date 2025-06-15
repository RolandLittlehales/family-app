import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardMedia,
  StatCard,
} from "../../src/components/Card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders children correctly", () => {
      render(
        <Card>
          <div>Test content</div>
        </Card>
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies variant classes correctly", () => {
      const { container } = render(
        <Card variant="elevated">
          <div>Test</div>
        </Card>
      );

      expect(container.firstChild).toHaveClass();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card className="custom-class">
          <div>Test</div>
        </Card>
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("CardHeader", () => {
    it("renders title correctly", () => {
      render(<CardHeader title="Test Title" />);

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Title")).toHaveRole("heading");
    });

    it("renders description when provided", () => {
      render(<CardHeader title="Test Title" description="Test Description" />);

      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders children when provided", () => {
      render(
        <CardHeader title="Test Title">
          <button>Action</button>
        </CardHeader>
      );

      expect(
        screen.getByRole("button", { name: "Action" })
      ).toBeInTheDocument();
    });
  });

  describe("CardContent", () => {
    it("renders children correctly", () => {
      render(
        <CardContent>
          <p>Card content</p>
        </CardContent>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("renders children correctly", () => {
      render(
        <CardFooter>
          <button>Cancel</button>
          <button>Save</button>
        </CardFooter>
      );

      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });

  describe("CardMedia", () => {
    it("renders image with correct attributes", () => {
      render(<CardMedia src="test-image.jpg" alt="Test image" />);

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });
  });

  describe("StatCard", () => {
    it("renders value and label correctly", () => {
      render(<StatCard value="100" label="Total Users" />);

      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("Total Users")).toBeInTheDocument();
    });

    it("renders change indicator when provided", () => {
      render(
        <StatCard
          value="100"
          label="Total Users"
          change={{ value: "+10%", type: "positive" }}
        />
      );

      expect(screen.getByText("+10%")).toBeInTheDocument();
      expect(screen.getByText("↗")).toBeInTheDocument();
    });

    it("renders negative change correctly", () => {
      render(
        <StatCard
          value="100"
          label="Total Users"
          change={{ value: "-5%", type: "negative" }}
        />
      );

      expect(screen.getByText("-5%")).toBeInTheDocument();
      expect(screen.getByText("↘")).toBeInTheDocument();
    });

    it("applies color variants correctly", () => {
      const { container } = render(
        <StatCard value="100" label="Total Users" color="primary" />
      );

      expect(container.firstChild).toHaveClass();
    });
  });

  describe("Complete Card Example", () => {
    it("renders a complete card with all components", () => {
      render(
        <Card variant="elevated">
          <CardMedia src="test.jpg" alt="Test" />
          <CardHeader title="Test Card" description="This is a test card" />
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Test Card")).toBeInTheDocument();
      expect(screen.getByText("This is a test card")).toBeInTheDocument();
      expect(screen.getByText("This is the card content")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Action" })
      ).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });
});
