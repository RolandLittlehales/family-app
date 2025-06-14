import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars, tokens } from "./theme.css";

// Button component recipe
export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.borderRadius.md,
    fontWeight: tokens.typography.fontWeight.medium,
    fontSize: tokens.typography.fontSize.sm,
    lineHeight: "1",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
    userSelect: "none",
    whiteSpace: "nowrap",

    ":focus": {
      outline: `2px solid ${vars.color.border.focus}`,
      outlineOffset: "2px",
    },

    ":focus:not(:focus-visible)": {
      outline: "none",
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
        backgroundColor: vars.color.brand.primary,
        color: vars.color.text.inverse,

        ":hover": {
          backgroundColor: vars.color.brand.primaryHover,
        },

        ":active": {
          backgroundColor: vars.color.brand.primaryActive,
        },
      },

      secondary: {
        backgroundColor: vars.color.background.secondary,
        color: vars.color.text.primary,
        border: `1px solid ${vars.color.border.primary}`,

        ":hover": {
          backgroundColor: vars.color.interactive.hover,
          borderColor: vars.color.border.secondary,
        },

        ":active": {
          backgroundColor: vars.color.interactive.active,
        },
      },

      outline: {
        backgroundColor: "transparent",
        color: vars.color.brand.primary,
        border: `1px solid ${vars.color.brand.primary}`,

        ":hover": {
          backgroundColor: vars.color.brand.primary,
          color: vars.color.text.inverse,
        },

        ":active": {
          backgroundColor: vars.color.brand.primaryActive,
        },
      },

      ghost: {
        backgroundColor: "transparent",
        color: vars.color.text.primary,

        ":hover": {
          backgroundColor: vars.color.interactive.hover,
        },

        ":active": {
          backgroundColor: vars.color.interactive.active,
        },
      },

      success: {
        backgroundColor: vars.color.semantic.success,
        color: vars.color.text.inverse,

        ":hover": {
          opacity: 0.9,
        },
      },

      warning: {
        backgroundColor: vars.color.semantic.warning,
        color: vars.color.text.inverse,

        ":hover": {
          opacity: 0.9,
        },
      },

      error: {
        backgroundColor: vars.color.semantic.error,
        color: vars.color.text.inverse,

        ":hover": {
          opacity: 0.9,
        },
      },
    },

    size: {
      xs: {
        height: "24px",
        paddingLeft: vars.spacing[2],
        paddingRight: vars.spacing[2],
        fontSize: tokens.typography.fontSize.xs,
      },

      sm: {
        height: "32px",
        paddingLeft: vars.spacing[3],
        paddingRight: vars.spacing[3],
        fontSize: tokens.typography.fontSize.sm,
      },

      md: {
        height: "40px",
        paddingLeft: vars.spacing[4],
        paddingRight: vars.spacing[4],
        fontSize: tokens.typography.fontSize.sm,
      },

      lg: {
        height: "48px",
        paddingLeft: vars.spacing[6],
        paddingRight: vars.spacing[6],
        fontSize: tokens.typography.fontSize.base,
      },

      xl: {
        height: "56px",
        paddingLeft: vars.spacing[8],
        paddingRight: vars.spacing[8],
        fontSize: tokens.typography.fontSize.lg,
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
    backgroundColor: vars.color.background.primary,
    border: `1px solid ${vars.color.border.primary}`,
    borderRadius: vars.borderRadius.md,
    fontSize: tokens.typography.fontSize.sm,
    lineHeight: "1.5",
    padding: `${vars.spacing[2]} ${vars.spacing[3]}`,
    color: vars.color.text.primary,
    transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
    width: "100%",

    "::placeholder": {
      color: vars.color.text.tertiary,
    },

    ":focus": {
      outline: "none",
      borderColor: vars.color.border.focus,
      boxShadow: `0 0 0 3px ${vars.color.brand.primary}33`,
    },

    ":disabled": {
      backgroundColor: vars.color.interactive.disabled,
      color: vars.color.text.disabled,
      cursor: "not-allowed",
    },
  },

  variants: {
    variant: {
      default: {},

      error: {
        borderColor: vars.color.border.error,

        ":focus": {
          borderColor: vars.color.border.error,
          boxShadow: `0 0 0 3px ${vars.color.semantic.error}33`,
        },
      },
    },

    size: {
      sm: {
        padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
        fontSize: tokens.typography.fontSize.xs,
      },

      md: {
        padding: `${vars.spacing[2]} ${vars.spacing[3]}`,
        fontSize: tokens.typography.fontSize.sm,
      },

      lg: {
        padding: `${vars.spacing[3]} ${vars.spacing[4]}`,
        fontSize: tokens.typography.fontSize.base,
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
    backgroundColor: vars.color.background.primary,
    border: `1px solid ${vars.color.border.primary}`,
    borderRadius: vars.borderRadius.lg,
    overflow: "hidden",
  },

  variants: {
    variant: {
      default: {
        boxShadow: vars.boxShadow.sm,
      },

      elevated: {
        boxShadow: vars.boxShadow.md,
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
        padding: vars.spacing[3],
      },

      md: {
        padding: vars.spacing[4],
      },

      lg: {
        padding: vars.spacing[6],
      },

      xl: {
        padding: vars.spacing[8],
      },
    },

    interactive: {
      true: {
        cursor: "pointer",
        transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,

        ":hover": {
          transform: "translateY(-1px)",
          boxShadow: vars.boxShadow.md,
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

// Badge component recipe
export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.borderRadius.full,
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: "1",
    textTransform: "uppercase",
    letterSpacing: tokens.typography.letterSpacing.wide,
    whiteSpace: "nowrap",
  },

  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.background.secondary,
        color: vars.color.text.secondary,
      },

      primary: {
        backgroundColor: vars.color.brand.primary,
        color: vars.color.text.inverse,
      },

      secondary: {
        backgroundColor: vars.color.brand.secondary,
        color: vars.color.text.inverse,
      },

      success: {
        backgroundColor: vars.color.semantic.success,
        color: vars.color.text.inverse,
      },

      warning: {
        backgroundColor: vars.color.semantic.warning,
        color: vars.color.text.inverse,
      },

      error: {
        backgroundColor: vars.color.semantic.error,
        color: vars.color.text.inverse,
      },

      info: {
        backgroundColor: vars.color.semantic.info,
        color: vars.color.text.inverse,
      },

      outline: {
        backgroundColor: "transparent",
        color: vars.color.text.primary,
        border: `1px solid ${vars.color.border.primary}`,
      },
    },

    size: {
      sm: {
        padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
        fontSize: tokens.typography.fontSize.xs,
      },

      md: {
        padding: `${vars.spacing[1]} ${vars.spacing[3]}`,
        fontSize: tokens.typography.fontSize.xs,
      },

      lg: {
        padding: `${vars.spacing[2]} ${vars.spacing[4]}`,
        fontSize: tokens.typography.fontSize.sm,
      },
    },
  },

  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Alert component recipe
export const alert = recipe({
  base: {
    borderRadius: vars.borderRadius.md,
    padding: vars.spacing[4],
    border: "1px solid",
    fontSize: tokens.typography.fontSize.sm,
    lineHeight: tokens.typography.lineHeight.relaxed,
  },

  variants: {
    variant: {
      info: {
        backgroundColor: vars.color.semantic.infoBackground,
        borderColor: vars.color.semantic.infoBorder,
        color: vars.color.semantic.info,
      },

      success: {
        backgroundColor: vars.color.semantic.successBackground,
        borderColor: vars.color.semantic.successBorder,
        color: vars.color.semantic.success,
      },

      warning: {
        backgroundColor: vars.color.semantic.warningBackground,
        borderColor: vars.color.semantic.warningBorder,
        color: vars.color.semantic.warning,
      },

      error: {
        backgroundColor: vars.color.semantic.errorBackground,
        borderColor: vars.color.semantic.errorBorder,
        color: vars.color.semantic.error,
      },
    },
  },

  defaultVariants: {
    variant: "info",
  },
});

// Avatar component styles
export const avatar = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.borderRadius.full,
    backgroundColor: vars.color.background.secondary,
    color: vars.color.text.secondary,
    fontWeight: tokens.typography.fontWeight.medium,
    overflow: "hidden",
    userSelect: "none",
  },

  variants: {
    size: {
      xs: {
        width: "24px",
        height: "24px",
        fontSize: tokens.typography.fontSize.xs,
      },

      sm: {
        width: "32px",
        height: "32px",
        fontSize: tokens.typography.fontSize.sm,
      },

      md: {
        width: "40px",
        height: "40px",
        fontSize: tokens.typography.fontSize.base,
      },

      lg: {
        width: "48px",
        height: "48px",
        fontSize: tokens.typography.fontSize.lg,
      },

      xl: {
        width: "64px",
        height: "64px",
        fontSize: tokens.typography.fontSize.xl,
      },

      "2xl": {
        width: "80px",
        height: "80px",
        fontSize: tokens.typography.fontSize["2xl"],
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Loading spinner styles
export const spinner = style({
  display: "inline-block",
  width: "20px",
  height: "20px",
  border: `2px solid ${vars.color.border.primary}`,
  borderRadius: vars.borderRadius.full,
  borderTopColor: vars.color.brand.primary,
  animation: "spin 1s linear infinite",

  "@keyframes": {
    spin: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },
});

// Tooltip styles
export const tooltip = style({
  position: "relative",
  display: "inline-block",

  "::before": {
    content: "attr(data-tooltip)",
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: vars.color.background.inverse,
    color: vars.color.text.inverse,
    padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
    borderRadius: vars.borderRadius.sm,
    fontSize: tokens.typography.fontSize.xs,
    whiteSpace: "nowrap",
    opacity: 0,
    visibility: "hidden",
    transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
    zIndex: vars.zIndex.tooltip,
    marginBottom: vars.spacing[1],
  },

  "::after": {
    content: '""',
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderTop: `4px solid ${vars.color.background.inverse}`,
    opacity: 0,
    visibility: "hidden",
    transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
    zIndex: vars.zIndex.tooltip,
  },

  ":hover::before, :hover::after": {
    opacity: 1,
    visibility: "visible",
  },
});

// Divider styles
export const divider = style({
  border: "none",
  height: "1px",
  backgroundColor: vars.color.border.primary,
  margin: `${vars.spacing[4]} 0`,
});

// Focus ring utility
export const focusRing = style({
  ":focus": {
    outline: `2px solid ${vars.color.border.focus}`,
    outlineOffset: "2px",
  },

  ":focus:not(:focus-visible)": {
    outline: "none",
  },
});
