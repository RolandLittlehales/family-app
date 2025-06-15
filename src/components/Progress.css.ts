import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const progressContainer = style({
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.medium,
});

export const progressTrack = recipe({
  base: {
    width: "100%",
    backgroundColor: vars.colors.muted,
    borderRadius: vars.radii.full,
    overflow: "hidden",
    position: "relative",
  },
  variants: {
    size: {
      small: {
        height: "4px",
      },
      medium: {
        height: "8px",
      },
      large: {
        height: "12px",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const progressFill = recipe({
  base: {
    height: "100%",
    transition: "width 0.3s ease-in-out",
    borderRadius: vars.radii.full,
  },
  variants: {
    color: {
      default: {
        backgroundColor: vars.colors.primary,
      },
      success: {
        backgroundColor: "#10b981",
      },
      warning: {
        backgroundColor: "#f59e0b",
      },
      danger: {
        backgroundColor: "#ef4444",
      },
      info: {
        backgroundColor: "#3b82f6",
      },
    },
    animated: {
      true: {
        backgroundImage:
          "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)",
        backgroundSize: "1rem 1rem",
        animation: "progress-animation 1s linear infinite",
      },
    },
  },
  defaultVariants: {
    color: "default",
    animated: false,
  },
});

export const progressLabel = style({
  fontSize: vars.typography.fontSize.small,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.foreground,
  minWidth: "3rem",
  textAlign: "right",
});

export const progressText = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  marginTop: "0.25rem",
});

export const circularProgressContainer = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const circularProgressSvg = recipe({
  base: {
    transform: "rotate(-90deg)",
  },
  variants: {
    size: {
      small: {
        width: "32px",
        height: "32px",
      },
      medium: {
        width: "48px",
        height: "48px",
      },
      large: {
        width: "64px",
        height: "64px",
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const circularProgressTrack = style({
  fill: "none",
  stroke: vars.colors.muted,
  strokeWidth: "4",
});

export const circularProgressFill = recipe({
  base: {
    fill: "none",
    strokeWidth: "4",
    strokeLinecap: "round",
    transition: "stroke-dashoffset 0.3s ease-in-out",
  },
  variants: {
    color: {
      default: {
        stroke: vars.colors.primary,
      },
      success: {
        stroke: "#10b981",
      },
      warning: {
        stroke: "#f59e0b",
      },
      danger: {
        stroke: "#ef4444",
      },
      info: {
        stroke: "#3b82f6",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export const circularProgressLabel = recipe({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: vars.typography.fontSize.small,
    fontWeight: vars.typography.fontWeight.medium,
    color: vars.colors.foreground,
  },
  variants: {
    size: {
      small: {
        fontSize: "0.75rem",
      },
      medium: {
        fontSize: vars.typography.fontSize.small,
      },
      large: {
        fontSize: vars.typography.fontSize.base,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const spinner = recipe({
  base: {
    border: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  variants: {
    size: {
      small: {
        width: "16px",
        height: "16px",
        borderTopColor: vars.colors.primary,
      },
      medium: {
        width: "24px",
        height: "24px",
        borderTopColor: vars.colors.primary,
      },
      large: {
        width: "32px",
        height: "32px",
        borderTopColor: vars.colors.primary,
      },
    },
    color: {
      default: {
        borderTopColor: vars.colors.primary,
      },
      success: {
        borderTopColor: "#10b981",
      },
      warning: {
        borderTopColor: "#f59e0b",
      },
      danger: {
        borderTopColor: "#ef4444",
      },
      info: {
        borderTopColor: "#3b82f6",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    color: "default",
  },
});

export const statusIndicator = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.spacing.small,
    fontSize: vars.typography.fontSize.small,
    fontWeight: vars.typography.fontWeight.medium,
  },
  variants: {
    status: {
      pending: {
        color: vars.colors.mutedForeground,
      },
      loading: {
        color: vars.colors.primary,
      },
      success: {
        color: "#10b981",
      },
      warning: {
        color: "#f59e0b",
      },
      error: {
        color: "#ef4444",
      },
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

export const statusDot = recipe({
  base: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  variants: {
    status: {
      pending: {
        backgroundColor: vars.colors.mutedForeground,
      },
      loading: {
        backgroundColor: vars.colors.primary,
        animation: "pulse 2s infinite",
      },
      success: {
        backgroundColor: "#10b981",
      },
      warning: {
        backgroundColor: "#f59e0b",
      },
      error: {
        backgroundColor: "#ef4444",
      },
    },
  },
  defaultVariants: {
    status: "pending",
  },
});
