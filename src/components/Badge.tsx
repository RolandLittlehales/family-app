import React from "react";
import * as styles from "./Badge.css";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "subtle";
  color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export interface BadgeDotProps {
  color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Badge({
  children,
  variant = "solid",
  color = "default",
  size = "medium",
  icon,
  iconPosition = "left",
  className = "",
}: BadgeProps) {
  const badgeClass = styles.badge({ variant, color, size });
  const iconClass = styles.badgeIcon({ position: iconPosition, size });

  return (
    <span className={`${badgeClass} ${className}`}>
      {icon && iconPosition === "left" && (
        <span className={iconClass}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={iconClass}>{icon}</span>
      )}
    </span>
  );
}

export function BadgeDot({
  color = "default",
  size = "medium",
  className = "",
}: BadgeDotProps) {
  const dotClass = styles.badgeDot({ color, size });

  return <span className={`${dotClass} ${className}`} />;
}

Badge.Dot = BadgeDot;
