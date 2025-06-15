import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const textarea = recipe({
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
    resize: "vertical",
    fontFamily: "inherit",

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
      resize: "none",
    },
  },

  variants: {
    size: {
      small: {
        minHeight: "4rem",
        padding: vars.spacing.small,
        fontSize: vars.typography.fontSize.small,
      },
      medium: {
        minHeight: "6rem",
        padding: vars.spacing.medium,
      },
      large: {
        minHeight: "8rem",
        padding: vars.spacing.medium,
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

    autoResize: {
      true: {
        resize: "none",
        overflow: "hidden",
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
    autoResize: false,
  },
});
