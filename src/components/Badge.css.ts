import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: vars.typography.fontSize.small,
    fontWeight: vars.typography.fontWeight.medium,
    textTransform: "uppercase",
    letterSpacing: "0.025em",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease-in-out",
    border: "1px solid transparent",
  },
  variants: {
    variant: {
      solid: {},
      outline: {
        backgroundColor: "transparent",
      },
      subtle: {},
    },
    color: {
      default: {},
      primary: {},
      success: {},
      warning: {},
      danger: {},
      info: {},
    },
    size: {
      small: {
        padding: `2px ${vars.spacing.small}`,
        fontSize: "0.75rem",
        borderRadius: vars.radii.small,
      },
      medium: {
        padding: `4px ${vars.spacing.small}`,
        fontSize: vars.typography.fontSize.small,
        borderRadius: vars.radii.small,
      },
      large: {
        padding: `6px ${vars.spacing.medium}`,
        fontSize: vars.typography.fontSize.base,
        borderRadius: vars.radii.medium,
      },
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variants: { variant: "solid", color: "default" },
      style: {
        backgroundColor: vars.colors.mutedForeground,
        color: vars.colors.background,
      },
    },
    {
      variants: { variant: "solid", color: "primary" },
      style: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.accentForeground,
      },
    },
    {
      variants: { variant: "solid", color: "success" },
      style: {
        backgroundColor: "#10b981",
        color: "white",
      },
    },
    {
      variants: { variant: "solid", color: "warning" },
      style: {
        backgroundColor: "#f59e0b",
        color: "white",
      },
    },
    {
      variants: { variant: "solid", color: "danger" },
      style: {
        backgroundColor: "#ef4444",
        color: "white",
      },
    },
    {
      variants: { variant: "solid", color: "info" },
      style: {
        backgroundColor: "#3b82f6",
        color: "white",
      },
    },
    // Outline variants
    {
      variants: { variant: "outline", color: "default" },
      style: {
        borderColor: vars.colors.border,
        color: vars.colors.foreground,
      },
    },
    {
      variants: { variant: "outline", color: "primary" },
      style: {
        borderColor: vars.colors.primary,
        color: vars.colors.primary,
      },
    },
    {
      variants: { variant: "outline", color: "success" },
      style: {
        borderColor: "#10b981",
        color: "#10b981",
      },
    },
    {
      variants: { variant: "outline", color: "warning" },
      style: {
        borderColor: "#f59e0b",
        color: "#f59e0b",
      },
    },
    {
      variants: { variant: "outline", color: "danger" },
      style: {
        borderColor: "#ef4444",
        color: "#ef4444",
      },
    },
    {
      variants: { variant: "outline", color: "info" },
      style: {
        borderColor: "#3b82f6",
        color: "#3b82f6",
      },
    },
    // Subtle variants
    {
      variants: { variant: "subtle", color: "default" },
      style: {
        backgroundColor: vars.colors.muted,
        color: vars.colors.foreground,
      },
    },
    {
      variants: { variant: "subtle", color: "primary" },
      style: {
        backgroundColor: "#eff6ff",
        color: vars.colors.primary,
      },
    },
    {
      variants: { variant: "subtle", color: "success" },
      style: {
        backgroundColor: "#ecfdf5",
        color: "#10b981",
      },
    },
    {
      variants: { variant: "subtle", color: "warning" },
      style: {
        backgroundColor: "#fffbeb",
        color: "#f59e0b",
      },
    },
    {
      variants: { variant: "subtle", color: "danger" },
      style: {
        backgroundColor: "#fef2f2",
        color: "#ef4444",
      },
    },
    {
      variants: { variant: "subtle", color: "info" },
      style: {
        backgroundColor: "#eff6ff",
        color: "#3b82f6",
      },
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "medium",
  },
});

export const badgeIcon = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    position: {
      left: {
        marginRight: "4px",
      },
      right: {
        marginLeft: "4px",
      },
    },
    size: {
      small: {
        width: "12px",
        height: "12px",
      },
      medium: {
        width: "14px",
        height: "14px",
      },
      large: {
        width: "16px",
        height: "16px",
      },
    },
  },
  defaultVariants: {
    position: "left",
    size: "medium",
  },
});

export const badgeDot = recipe({
  base: {
    display: "inline-block",
    borderRadius: "50%",
  },
  variants: {
    size: {
      small: {
        width: "6px",
        height: "6px",
      },
      medium: {
        width: "8px",
        height: "8px",
      },
      large: {
        width: "10px",
        height: "10px",
      },
    },
    color: {
      default: {
        backgroundColor: vars.colors.mutedForeground,
      },
      primary: {
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
  },
  defaultVariants: {
    size: "medium",
    color: "default",
  },
});
