import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const input = recipe({
  base: {
    display: "flex",
    width: "100%",
    borderRadius: vars.radii.medium,
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.normal,
    lineHeight: "1.5",
    transition: "all 0.2s ease-in-out",
    backgroundColor: vars.colors.inputBackground,
    color: vars.colors.foreground,
    border: `1px solid ${vars.colors.inputBorder}`,

    "::placeholder": {
      color: vars.colors.inputPlaceholder,
    },

    ":focus": {
      outline: "none",
      borderColor: vars.colors.inputBorderFocus,
      boxShadow: `0 0 0 3px ${vars.colors.inputBorderFocus}25`,
    },

    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      backgroundColor: vars.colors.muted,
    },
  },

  variants: {
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
        padding: `0 ${vars.spacing.medium}`,
        fontSize: vars.typography.fontSize.large,
      },
    },

    variant: {
      default: {},
      error: {
        borderColor: vars.colors.inputBorderError,
        ":focus": {
          borderColor: vars.colors.inputBorderError,
          boxShadow: `0 0 0 3px ${vars.colors.error}25`,
        },
      },
      success: {
        borderColor: vars.colors.inputBorderSuccess,
        ":focus": {
          borderColor: vars.colors.inputBorderSuccess,
          boxShadow: `0 0 0 3px ${vars.colors.success}25`,
        },
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },

  defaultVariants: {
    size: "medium",
    variant: "default",
    fullWidth: true,
  },
});
