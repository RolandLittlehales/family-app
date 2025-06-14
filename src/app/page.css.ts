import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: vars.spacing.large,
  backgroundColor: vars.colors.background,
  color: vars.colors.foreground,
});

export const title = style({
  fontSize: vars.typography.fontSize["3xl"],
  fontWeight: vars.typography.fontWeight.bold,
  marginBottom: vars.spacing.medium,
  textAlign: "center",
  color: vars.colors.foreground,
});

export const description = style({
  fontSize: vars.typography.fontSize.large,
  maxWidth: "600px",
  textAlign: "center",
  lineHeight: 1.6,
  marginBottom: vars.spacing.large,
  color: vars.colors.mutedForeground,
});

export const buttonContainer = style({
  display: "flex",
  gap: vars.spacing.medium,
  flexWrap: "wrap",
  justifyContent: "center",
});
