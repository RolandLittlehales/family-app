import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const checkboxWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing.small,
  cursor: "pointer",
  userSelect: "none",
});

export const checkboxWrapperDisabled = style({
  opacity: 0.5,
  cursor: "not-allowed",
});

export const hiddenInput = style({
  position: "absolute",
  opacity: 0,
  width: "1px",
  height: "1px",
  margin: "-1px",
  border: 0,
  padding: 0,
  whiteSpace: "nowrap",
  clipPath: "inset(100%)",
  clip: "rect(0 0 0 0)",
  overflow: "hidden",
});

export const checkboxBox = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radii.small,
    border: `2px solid ${vars.colors.inputBorder}`,
    backgroundColor: vars.colors.inputBackground,
    transition: "all 0.2s ease-in-out",
    color: vars.colors.accentForeground,

    selectors: {
      [`${hiddenInput}:focus + &`]: {
        outline: `2px solid ${vars.colors.inputBorderFocus}`,
        outlineOffset: "2px",
      },

      [`${hiddenInput}:checked + &`]: {
        backgroundColor: vars.colors.primary,
        borderColor: vars.colors.primary,
      },

      [`${hiddenInput}:checked:hover + &`]: {
        backgroundColor: vars.colors.primaryHover,
        borderColor: vars.colors.primaryHover,
      },

      [`${hiddenInput}:indeterminate + &`]: {
        backgroundColor: vars.colors.primary,
        borderColor: vars.colors.primary,
      },

      [`${hiddenInput}:disabled + &`]: {
        backgroundColor: vars.colors.muted,
        borderColor: vars.colors.border,
        cursor: "not-allowed",
      },
    },

    ":hover": {
      borderColor: vars.colors.primary,
    },
  },

  variants: {
    size: {
      small: {
        width: "1rem",
        height: "1rem",
      },
      medium: {
        width: "1.25rem",
        height: "1.25rem",
      },
      large: {
        width: "1.5rem",
        height: "1.5rem",
      },
    },

    variant: {
      default: {},
      error: {
        borderColor: vars.colors.inputBorderError,

        selectors: {
          [`${hiddenInput}:checked + &`]: {
            backgroundColor: vars.colors.error,
            borderColor: vars.colors.error,
          },
        },
      },
    },
  },

  defaultVariants: {
    size: "medium",
    variant: "default",
  },
});

export const checkboxLabel = recipe({
  base: {
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.normal,
    color: vars.colors.foreground,
    lineHeight: "1.5",
    cursor: "pointer",

    selectors: {
      [`${hiddenInput}:disabled ~ &`]: {
        color: vars.colors.mutedForeground,
        cursor: "not-allowed",
      },
    },
  },

  variants: {
    size: {
      small: {
        fontSize: vars.typography.fontSize.small,
      },
      medium: {
        fontSize: vars.typography.fontSize.base,
      },
      large: {
        fontSize: vars.typography.fontSize.large,
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const checkIcon = style({
  width: "100%",
  height: "100%",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    [`${hiddenInput}:checked ~ * &`]: {
      opacity: 1,
    },
  },
});

export const indeterminateIcon = style({
  width: "100%",
  height: "100%",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    [`${hiddenInput}:indeterminate ~ * &`]: {
      opacity: 1,
    },
  },
});
