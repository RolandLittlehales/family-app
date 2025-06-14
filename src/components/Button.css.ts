import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radii.medium,
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.medium,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    textDecoration: "none",
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.accentForeground,
        ":hover": {
          backgroundColor: vars.colors.primaryHover,
        },
      },
      secondary: {
        backgroundColor: vars.colors.muted,
        color: vars.colors.foreground,
        ":hover": {
          backgroundColor: vars.colors.border,
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: vars.colors.primary,
        border: `1px solid ${vars.colors.primary}`,
        ":hover": {
          backgroundColor: vars.colors.primary,
          color: vars.colors.accentForeground,
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.colors.foreground,
        ":hover": {
          backgroundColor: vars.colors.muted,
        },
      },
    },
    size: {
      small: {
        height: "2rem",
        padding: `0 ${vars.spacing.small}`,
        fontSize: vars.typography.fontSize.small,
      },
      medium: {
        height: "2.5rem",
        padding: `0 ${vars.spacing.medium}`,
      },
      large: {
        height: "3rem",
        padding: `0 ${vars.spacing.large}`,
        fontSize: vars.typography.fontSize.large,
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
