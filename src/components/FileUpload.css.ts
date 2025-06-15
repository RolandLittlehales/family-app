import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const fileUploadWrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});

export const fileUploadArea = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: vars.spacing.large,
    borderRadius: vars.radii.medium,
    border: `2px dashed ${vars.colors.inputBorder}`,
    backgroundColor: vars.colors.inputBackground,
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    textAlign: "center",
    minHeight: "120px",

    ":hover": {
      borderColor: vars.colors.primary,
      backgroundColor: vars.colors.muted,
    },

    ":focus-within": {
      outline: "none",
      borderColor: vars.colors.inputBorderFocus,
      boxShadow: `0 0 0 3px ${vars.colors.inputBorderFocus}25`,
    },
  },

  variants: {
    variant: {
      default: {},
      error: {
        borderColor: vars.colors.inputBorderError,
        ":hover": {
          borderColor: vars.colors.error,
        },
        ":focus-within": {
          borderColor: vars.colors.inputBorderError,
          boxShadow: `0 0 0 3px ${vars.colors.error}25`,
        },
      },
    },

    dragActive: {
      true: {
        borderColor: vars.colors.primary,
        backgroundColor: vars.colors.muted,
        transform: "scale(1.02)",
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
        ":hover": {
          borderColor: vars.colors.inputBorder,
          backgroundColor: vars.colors.inputBackground,
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
    dragActive: false,
    disabled: false,
  },
});

export const hiddenInput = style({
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",

  ":disabled": {
    cursor: "not-allowed",
  },
});

export const fileUploadIcon = style({
  marginBottom: vars.spacing.small,
  color: vars.colors.mutedForeground,
});

export const fileUploadText = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.foreground,
  marginBottom: vars.spacing.small,
});

export const fileUploadSubtext = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
});

export const fileList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
});

export const fileItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: vars.spacing.small,
  backgroundColor: vars.colors.muted,
  borderRadius: vars.radii.small,
  border: `1px solid ${vars.colors.border}`,
});

export const fileInfo = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
  flex: 1,
  minWidth: 0,
});

export const fileName = style({
  fontSize: vars.typography.fontSize.small,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.foreground,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const fileSize = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  flexShrink: 0,
});

export const removeButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: vars.radii.small,
  border: "none",
  backgroundColor: "transparent",
  color: vars.colors.mutedForeground,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  flexShrink: 0,

  ":hover": {
    backgroundColor: vars.colors.error,
    color: vars.colors.errorForeground,
  },

  ":focus": {
    outline: `2px solid ${vars.colors.inputBorderFocus}`,
    outlineOffset: "1px",
  },
});
