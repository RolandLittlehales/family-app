import { recipe } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

// Button component recipe
export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radii.medium,
    fontWeight: vars.typography.fontWeight.medium,
    fontSize: vars.typography.fontSize.small,
    lineHeight: "1",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    userSelect: "none",
    whiteSpace: "nowrap",

    ":focus": {
      outline: `2px solid ${vars.colors.primary}`,
      outlineOffset: "2px",
    },

    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.background,

        ":hover": {
          backgroundColor: vars.colors.primaryHover,
        },

        ":active": {
          opacity: 0.9,
        },
      },

      secondary: {
        backgroundColor: vars.colors.muted,
        color: vars.colors.foreground,
        border: `1px solid ${vars.colors.border}`,

        ":hover": {
          backgroundColor: vars.colors.mutedForeground,
          borderColor: vars.colors.primary,
        },

        ":active": {
          opacity: 0.9,
        },
      },

      outline: {
        backgroundColor: "transparent",
        color: vars.colors.primary,
        border: `1px solid ${vars.colors.primary}`,

        ":hover": {
          backgroundColor: vars.colors.primary,
          color: vars.colors.background,
        },

        ":active": {
          opacity: 0.9,
        },
      },

      ghost: {
        backgroundColor: "transparent",
        color: vars.colors.foreground,

        ":hover": {
          backgroundColor: vars.colors.muted,
        },

        ":active": {
          opacity: 0.9,
        },
      },
    },

    size: {
      xs: {
        height: "24px",
        paddingLeft: vars.spacing.small,
        paddingRight: vars.spacing.small,
        fontSize: vars.typography.fontSize.small,
      },

      sm: {
        height: "32px",
        paddingLeft: vars.spacing.medium,
        paddingRight: vars.spacing.medium,
        fontSize: vars.typography.fontSize.small,
      },

      md: {
        height: "40px",
        paddingLeft: vars.spacing.medium,
        paddingRight: vars.spacing.medium,
        fontSize: vars.typography.fontSize.base,
      },

      lg: {
        height: "48px",
        paddingLeft: vars.spacing.large,
        paddingRight: vars.spacing.large,
        fontSize: vars.typography.fontSize.large,
      },

      xl: {
        height: "56px",
        paddingLeft: vars.spacing.xlarge,
        paddingRight: vars.spacing.xlarge,
        fontSize: vars.typography.fontSize.xlarge,
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
    size: "md",
  },
});

// Input component recipe
export const input = recipe({
  base: {
    appearance: "none",
    backgroundColor: vars.colors.background,
    border: `1px solid ${vars.colors.border}`,
    borderRadius: vars.radii.medium,
    fontSize: vars.typography.fontSize.base,
    lineHeight: "1.5",
    padding: `${vars.spacing.small} ${vars.spacing.medium}`,
    color: vars.colors.foreground,
    transition: "all 0.2s ease",
    width: "100%",

    "::placeholder": {
      color: vars.colors.mutedForeground,
    },

    ":focus": {
      outline: "none",
      borderColor: vars.colors.primary,
      boxShadow: `0 0 0 3px ${vars.colors.primary}33`,
    },

    ":disabled": {
      backgroundColor: vars.colors.muted,
      color: vars.colors.mutedForeground,
      cursor: "not-allowed",
    },
  },

  variants: {
    variant: {
      default: {},

      error: {
        borderColor: vars.colors.primary,

        ":focus": {
          borderColor: vars.colors.primary,
          boxShadow: `0 0 0 3px ${vars.colors.primary}33`,
        },
      },
    },

    size: {
      sm: {
        padding: `${vars.spacing.small} ${vars.spacing.small}`,
        fontSize: vars.typography.fontSize.small,
      },

      md: {
        padding: `${vars.spacing.small} ${vars.spacing.medium}`,
        fontSize: vars.typography.fontSize.base,
      },

      lg: {
        padding: `${vars.spacing.medium} ${vars.spacing.large}`,
        fontSize: vars.typography.fontSize.large,
      },
    },
  },

  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Card component recipe
export const card = recipe({
  base: {
    backgroundColor: vars.colors.background,
    border: `1px solid ${vars.colors.border}`,
    borderRadius: vars.radii.large,
    overflow: "hidden",
  },

  variants: {
    variant: {
      default: {
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },

      elevated: {
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },

      flat: {
        boxShadow: "none",
      },
    },

    padding: {
      none: {
        padding: 0,
      },

      sm: {
        padding: vars.spacing.medium,
      },

      md: {
        padding: vars.spacing.large,
      },

      lg: {
        padding: vars.spacing.xlarge,
      },
    },

    interactive: {
      true: {
        cursor: "pointer",
        transition: "all 0.2s ease",

        ":hover": {
          transform: "translateY(-1px)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});
