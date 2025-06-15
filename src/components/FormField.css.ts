import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const formField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.small,
  marginBottom: vars.spacing.medium,
});

export const label = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.foreground,
  lineHeight: "1.5",
});

export const labelRequired = style({
  "::after": {
    content: '" *"',
    color: vars.colors.error,
    marginLeft: "2px",
  },
});

export const helpText = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  lineHeight: "1.4",
});

export const errorMessage = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.error,
  lineHeight: "1.4",
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const successMessage = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.success,
  lineHeight: "1.4",
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const fieldWrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});
