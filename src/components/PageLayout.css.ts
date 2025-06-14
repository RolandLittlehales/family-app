import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const container = style({
  padding: vars.spacing.xlarge,
  maxWidth: "1200px",
  margin: "0 auto",
  minHeight: "calc(100vh - 80px)", // Account for header height

  "@media": {
    "screen and (max-width: 768px)": {
      padding: vars.spacing.medium,
    },
  },
});

export const header = style({
  marginBottom: vars.spacing.xlarge,
});

export const title = style({
  fontSize: vars.typography.fontSize["3xl"],
  fontWeight: vars.typography.fontWeight.bold,
  marginBottom: vars.spacing.large,
  color: vars.colors.foreground,

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: vars.typography.fontSize["2xl"],
    },
  },
});

export const titleGradient = style({
  background: `linear-gradient(135deg, ${vars.colors.primary}, ${vars.colors.accent})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
});

export const subtitle = style({
  fontSize: vars.typography.fontSize.large,
  color: vars.colors.mutedForeground,
  lineHeight: "1.6",
  maxWidth: "600px",

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: vars.typography.fontSize.base,
    },
  },
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xlarge,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.large,
});

export const sectionTitle = style({
  fontSize: vars.typography.fontSize["2xl"],
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  marginBottom: vars.spacing.medium,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: vars.spacing.large,

  "@media": {
    "screen and (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: vars.spacing.medium,
    },
  },
});

export const statsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: vars.spacing.medium,

  "@media": {
    "screen and (max-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: vars.spacing.small,
    },
  },
});
