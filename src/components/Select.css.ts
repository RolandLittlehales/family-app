import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const selectWrapper = style({
  position: "relative",
  display: "inline-block",
  width: "100%",
});

export const selectTrigger = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: vars.radii.medium,
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.normal,
    lineHeight: "1.5",
    transition: "all 0.2s ease-in-out",
    backgroundColor: vars.colors.inputBackground,
    color: vars.colors.foreground,
    border: `1px solid ${vars.colors.inputBorder}`,
    cursor: "pointer",
    userSelect: "none",

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

    open: {
      true: {
        borderColor: vars.colors.inputBorderFocus,
        boxShadow: `0 0 0 3px ${vars.colors.inputBorderFocus}25`,
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
    open: false,
  },
});

export const selectValue = style({
  flex: 1,
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const selectPlaceholder = style({
  color: vars.colors.inputPlaceholder,
});

export const selectIcon = style({
  marginLeft: vars.spacing.small,
  transition: "transform 0.2s ease-in-out",
  flexShrink: 0,
});

export const selectIconOpen = style({
  transform: "rotate(180deg)",
});

export const selectDropdown = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 50,
  marginTop: "2px",
  backgroundColor: vars.colors.inputBackground,
  border: `1px solid ${vars.colors.inputBorder}`,
  borderRadius: vars.radii.medium,
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  maxHeight: "200px",
  overflowY: "auto",
  opacity: 0,
  transform: "translateY(-8px)",
  visibility: "hidden",
  transition: "all 0.2s ease-in-out",
});

export const selectDropdownOpen = style({
  opacity: 1,
  transform: "translateY(0)",
  visibility: "visible",
});

export const selectOption = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: vars.spacing.medium,
    fontSize: vars.typography.fontSize.base,
    color: vars.colors.foreground,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "background-color 0.2s ease-in-out",

    ":hover": {
      backgroundColor: vars.colors.muted,
    },

    ":focus": {
      outline: "none",
      backgroundColor: vars.colors.muted,
    },

    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      backgroundColor: "transparent",
    },
  },

  variants: {
    selected: {
      true: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.accentForeground,

        ":hover": {
          backgroundColor: vars.colors.primaryHover,
        },
      },
    },

    size: {
      small: {
        padding: vars.spacing.small,
        fontSize: vars.typography.fontSize.small,
      },
      medium: {
        padding: vars.spacing.medium,
      },
      large: {
        padding: vars.spacing.medium,
        fontSize: vars.typography.fontSize.large,
      },
    },
  },

  defaultVariants: {
    selected: false,
    size: "medium",
  },
});

export const hiddenSelect = style({
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
