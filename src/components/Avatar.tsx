"use client";

import React, { useState } from "react";
import * as styles from "./Avatar.css";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  variant?: "default" | "rounded" | "square";
  fallbackColor?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info";
  className?: string;
  onClick?: () => void;
}

export interface AvatarBadgeProps {
  status?: "online" | "offline" | "away" | "busy";
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  size?: "small" | "medium" | "large";
  className?: string;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  spacing?: "tight" | "normal" | "loose";
  max?: number;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "medium",
  variant = "default",
  fallbackColor = "default",
  className = "",
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const avatarClass = styles.avatar({ size, variant });
  const imageClass = styles.avatarImage({ variant });
  const fallbackClass = styles.avatarFallback({ color: fallbackColor });

  const handleImageError = () => {
    setImageError(true);
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || "Avatar"}
          className={imageClass}
          onError={handleImageError}
        />
      );
    }

    if (fallback) {
      return (
        <div className={fallbackClass}>
          {fallback.length <= 2 ? fallback : getInitials(fallback)}
        </div>
      );
    }

    return (
      <div className={fallbackClass}>
        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`${avatarClass} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {renderContent()}
    </div>
  );
}

export function AvatarBadge({
  status = "online",
  position = "bottom-right",
  size = "medium",
  className = "",
}: AvatarBadgeProps) {
  const badgeClass = styles.avatarBadge({ position, size, status });

  return <div className={`${badgeClass} ${className}`} />;
}

export function AvatarGroup({
  children,
  spacing = "normal",
  max,
  className = "",
}: AvatarGroupProps) {
  const groupClass = styles.avatarGroup({ spacing });
  const itemClass = styles.avatarGroupItem({ spacing });

  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? Math.max(childrenArray.length - max, 0) : 0;

  return (
    <div className={`${groupClass} ${className}`}>
      {visibleChildren.map((child, index) => (
        <div key={index} className={itemClass}>
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={itemClass}>
          <Avatar
            fallback={`+${remainingCount}`}
            fallbackColor="secondary"
            size="medium"
          />
        </div>
      )}
    </div>
  );
}

Avatar.Badge = AvatarBadge;
Avatar.Group = AvatarGroup;
