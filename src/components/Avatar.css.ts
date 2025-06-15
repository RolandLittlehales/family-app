import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const avatar = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
    borderRadius: vars.radii.full,
    backgroundColor: vars.colors.muted,
    color: vars.colors.foreground,
    fontWeight: vars.typography.fontWeight.medium,
    overflow: "hidden",
    userSelect: "none",
  },
  variants: {
    size: {
      small: {
        width: "32px",
        height: "32px",
        fontSize: "0.75rem",
      },
      medium: {
        width: "40px",
        height: "40px",
        fontSize: vars.typography.fontSize.small,
      },
      large: {
        width: "48px",
        height: "48px",
        fontSize: vars.typography.fontSize.base,
      },
      xlarge: {
        width: "64px",
        height: "64px",
        fontSize: vars.typography.fontSize.large,
      },
    },
    variant: {
      default: {},
      rounded: {
        borderRadius: vars.radii.medium,
      },
      square: {
        borderRadius: vars.radii.small,
      },
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "default",
  },
});

export const avatarImage = recipe({
  base: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  variants: {
    variant: {
      default: {
        borderRadius: vars.radii.full,
      },
      rounded: {
        borderRadius: vars.radii.medium,
      },
      square: {
        borderRadius: vars.radii.small,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const avatarFallback = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: vars.colors.primary,
    color: vars.colors.accentForeground,
  },
  variants: {
    color: {
      default: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.accentForeground,
      },
      secondary: {
        backgroundColor: vars.colors.mutedForeground,
        color: vars.colors.background,
      },
      success: {
        backgroundColor: "#10b981",
        color: "white",
      },
      warning: {
        backgroundColor: "#f59e0b",
        color: "white",
      },
      danger: {
        backgroundColor: "#ef4444",
        color: "white",
      },
      info: {
        backgroundColor: "#3b82f6",
        color: "white",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export const avatarBadge = recipe({
  base: {
    position: "absolute",
    borderRadius: vars.radii.full,
    border: `2px solid ${vars.colors.background}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    position: {
      "top-right": {
        top: "0",
        right: "0",
        transform: "translate(25%, -25%)",
      },
      "bottom-right": {
        bottom: "0",
        right: "0",
        transform: "translate(25%, 25%)",
      },
      "top-left": {
        top: "0",
        left: "0",
        transform: "translate(-25%, -25%)",
      },
      "bottom-left": {
        bottom: "0",
        left: "0",
        transform: "translate(-25%, 25%)",
      },
    },
    size: {
      small: {
        width: "12px",
        height: "12px",
      },
      medium: {
        width: "16px",
        height: "16px",
      },
      large: {
        width: "20px",
        height: "20px",
      },
    },
    status: {
      online: {
        backgroundColor: "#10b981",
      },
      offline: {
        backgroundColor: "#6b7280",
      },
      away: {
        backgroundColor: "#f59e0b",
      },
      busy: {
        backgroundColor: "#ef4444",
      },
    },
  },
  defaultVariants: {
    position: "bottom-right",
    size: "medium",
    status: "online",
  },
});

export const avatarGroup = recipe({
  base: {
    display: "flex",
    alignItems: "center",
  },
  variants: {
    spacing: {
      tight: {
        gap: "-8px",
      },
      normal: {
        gap: "-4px",
      },
      loose: {
        gap: "0px",
      },
    },
  },
  defaultVariants: {
    spacing: "normal",
  },
});

export const avatarGroupItem = recipe({
  base: {
    position: "relative",
    border: `2px solid ${vars.colors.background}`,
    borderRadius: vars.radii.full,
  },
  variants: {
    spacing: {
      tight: {
        marginLeft: "-8px",
      },
      normal: {
        marginLeft: "-4px",
      },
      loose: {
        marginLeft: "0px",
      },
    },
  },
  compoundVariants: [
    {
      variants: { spacing: "tight" },
      style: {
        ":first-child": {
          marginLeft: "0",
        },
      },
    },
    {
      variants: { spacing: "normal" },
      style: {
        ":first-child": {
          marginLeft: "0",
        },
      },
    },
    {
      variants: { spacing: "loose" },
      style: {
        ":first-child": {
          marginLeft: "0",
        },
      },
    },
  ],
  defaultVariants: {
    spacing: "normal",
  },
});
