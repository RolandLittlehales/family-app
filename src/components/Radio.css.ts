import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const radioWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing.small,
  cursor: "pointer",
  userSelect: "none",
});

export const radioWrapperDisabled = style({
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

export const radioCircle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radii.full,
    border: `2px solid ${vars.colors.inputBorder}`,
    backgroundColor: vars.colors.inputBackground,
    transition: "all 0.2s ease-in-out",
    position: "relative",

    selectors: {
      [`${hiddenInput}:focus + &`]: {
        outline: `2px solid ${vars.colors.inputBorderFocus}`,
        outlineOffset: "2px",
      },

      [`${hiddenInput}:checked + &`]: {
        borderColor: vars.colors.primary,
      },

      [`${hiddenInput}:checked:hover + &`]: {
        borderColor: vars.colors.primaryHover,
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

export const radioLabel = recipe({
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

export const radioDot = recipe({
  base: {
    borderRadius: vars.radii.full,
    backgroundColor: vars.colors.primary,
    opacity: 0,
    transition: "all 0.2s ease-in-out",
    transform: "scale(0)",

    selectors: {
      [`${hiddenInput}:checked ~ * &`]: {
        opacity: 1,
        transform: "scale(1)",
      },

      [`${hiddenInput}:disabled:checked ~ * &`]: {
        backgroundColor: vars.colors.mutedForeground,
      },
    },
  },

  variants: {
    size: {
      small: {
        width: "0.375rem",
        height: "0.375rem",
      },
      medium: {
        width: "0.5rem",
        height: "0.5rem",
      },
      large: {
        width: "0.625rem",
        height: "0.625rem",
      },
    },

    variant: {
      default: {},
      error: {
        selectors: {
          [`${hiddenInput}:checked ~ * &`]: {
            backgroundColor: vars.colors.error,
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
