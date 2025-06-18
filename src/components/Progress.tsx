import React from "react";
import * as styles from "./Progress.css";

export interface ProgressProps {
  value: number;
  max?: number;
  size?: "small" | "medium" | "large";
  color?: "default" | "success" | "warning" | "danger" | "info";
  showLabel?: boolean;
  showText?: boolean;
  text?: string;
  animated?: boolean;
  className?: string;
}

export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: "small" | "medium" | "large";
  color?: "default" | "success" | "warning" | "danger" | "info";
  showLabel?: boolean;
  strokeWidth?: number;
  className?: string;
}

export interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export interface StatusIndicatorProps {
  status: "pending" | "loading" | "success" | "warning" | "error";
  children: React.ReactNode;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = "medium",
  color = "default",
  showLabel = false,
  showText = false,
  text,
  animated = false,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const trackClass = styles.progressTrack({ size });
  const fillClass = styles.progressFill({ color, animated });

  return (
    <div className={className}>
      <div className={styles.progressContainer}>
        <div className={trackClass}>
          <div className={fillClass} style={{ width: `${percentage}%` }} />
        </div>
        {showLabel && (
          <span className={styles.progressLabel}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      {showText && text && <div className={styles.progressText}>{text}</div>}
    </div>
  );
}

export function CircularProgress({
  value,
  max = 100,
  size = "medium",
  color = "default",
  showLabel = false,
  strokeWidth = 4,
  className = "",
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const radius = (sizeMap[size] - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const svgClass = styles.circularProgressSvg({ size });
  const fillClass = styles.circularProgressFill({ color });
  const labelClass = styles.circularProgressLabel({ size });

  return (
    <div className={`${styles.circularProgressContainer} ${className}`}>
      <svg className={svgClass} width={sizeMap[size]} height={sizeMap[size]}>
        <circle
          className={styles.circularProgressTrack}
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={fillClass}
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showLabel && (
        <span className={labelClass}>{Math.round(percentage)}%</span>
      )}
    </div>
  );
}

export function Spinner({
  size = "medium",
  color = "default",
  className = "",
}: SpinnerProps) {
  const spinnerClass = styles.spinner({ size, color });

  return <div className={`${spinnerClass} ${className}`} />;
}

export function StatusIndicator({
  status,
  children,
  className = "",
}: StatusIndicatorProps) {
  const indicatorClass = styles.statusIndicator({ status });
  const dotClass = styles.statusDot({ status });

  return (
    <div className={`${indicatorClass} ${className}`}>
      <span className={dotClass} />
      {children}
    </div>
  );
}

Progress.Circular = CircularProgress;
Progress.Spinner = Spinner;
Progress.Status = StatusIndicator;
