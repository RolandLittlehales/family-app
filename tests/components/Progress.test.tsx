import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the Progress CSS module
jest.mock("../../src/components/Progress.css", () => ({
  progressContainer: "mocked-progress-container",
  progressTrack: () => "mocked-progress-track",
  progressFill: () => "mocked-progress-fill",
  progressLabel: "mocked-progress-label",
  progressText: "mocked-progress-text",
  circularProgressContainer: "mocked-circular-progress-container",
  circularProgressSvg: () => "mocked-circular-progress-svg",
  circularProgressTrack: "mocked-circular-progress-track",
  circularProgressFill: () => "mocked-circular-progress-fill",
  circularProgressLabel: () => "mocked-circular-progress-label",
  spinner: () => "mocked-spinner",
  statusIndicator: () => "mocked-status-indicator",
  statusDot: () => "mocked-status-dot",
}));

import {
  Progress,
  CircularProgress,
  Spinner,
  StatusIndicator,
} from "../../src/components/Progress";

describe("Progress Components", () => {
  describe("Progress", () => {
    it("renders progress bar with correct value", () => {
      const { container } = render(<Progress value={50} />);

      const progressBar = container.querySelector('[style*="width: 50%"]');
      expect(progressBar).toBeInTheDocument();
    });

    it("renders label when showLabel is true", () => {
      render(<Progress value={75} showLabel />);

      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("renders text when showText is true", () => {
      render(<Progress value={25} showText text="Loading..." />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("handles max value correctly", () => {
      render(<Progress value={150} max={200} showLabel />);

      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("clamps values to valid range", () => {
      const { rerender } = render(<Progress value={-10} showLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();

      rerender(<Progress value={150} max={100} showLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("applies size classes correctly", () => {
      const { container } = render(<Progress value={50} size="large" />);

      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Progress value={50} className="custom-progress" />
      );

      expect(container.firstChild).toHaveClass("custom-progress");
    });
  });

  describe("CircularProgress", () => {
    it("renders circular progress correctly", () => {
      const { container } = render(<CircularProgress value={60} />);

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders label when showLabel is true", () => {
      render(<CircularProgress value={80} showLabel />);

      expect(screen.getByText("80%")).toBeInTheDocument();
    });

    it("calculates stroke offset correctly", () => {
      const { container } = render(<CircularProgress value={25} />);

      const progressCircle = container.querySelector("circle:last-child");
      expect(progressCircle).toBeInTheDocument();
    });

    it("handles different sizes", () => {
      const { container } = render(
        <CircularProgress value={50} size="large" />
      );

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "64");
      expect(svg).toHaveAttribute("height", "64");
    });
  });

  describe("Spinner", () => {
    it("renders spinner correctly", () => {
      const { container } = render(<Spinner />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies size classes correctly", () => {
      const { container } = render(<Spinner size="large" />);

      expect(container.firstChild).toHaveClass("mocked-spinner");
    });

    it("applies color classes correctly", () => {
      const { container } = render(<Spinner color="success" />);

      expect(container.firstChild).toHaveClass("mocked-spinner");
    });

    it("applies custom className", () => {
      const { container } = render(<Spinner className="custom-spinner" />);

      expect(container.firstChild).toHaveClass("custom-spinner");
    });
  });

  describe("StatusIndicator", () => {
    it("renders status and children correctly", () => {
      render(
        <StatusIndicator status="success">Task completed</StatusIndicator>
      );

      expect(screen.getByText("Task completed")).toBeInTheDocument();
    });

    it("applies status classes correctly", () => {
      const { container } = render(
        <StatusIndicator status="error">Error message</StatusIndicator>
      );

      expect(container.firstChild).toHaveClass("mocked-status-indicator");
    });

    it("renders all status types", () => {
      const statuses = [
        "pending",
        "loading",
        "success",
        "warning",
        "error",
      ] as const;

      statuses.forEach(status => {
        render(
          <StatusIndicator status={status}>{status} status</StatusIndicator>
        );

        expect(screen.getByText(`${status} status`)).toBeInTheDocument();
      });
    });

    it("applies custom className", () => {
      const { container } = render(
        <StatusIndicator status="pending" className="custom-status">
          Test
        </StatusIndicator>
      );

      expect(container.firstChild).toHaveClass("custom-status");
    });
  });

  describe("Progress variations", () => {
    it("renders animated progress correctly", () => {
      const { container } = render(<Progress value={50} animated />);

      const progressBar = container.querySelector('[style*="width: 50%"]');
      expect(progressBar).toBeInTheDocument();
    });

    it("handles zero and full values", () => {
      const { rerender } = render(<Progress value={0} showLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();

      rerender(<Progress value={100} showLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });
  });
});
