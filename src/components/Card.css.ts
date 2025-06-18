import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const cardBase = style({
  backgroundColor: vars.colors.background,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.medium,
  overflow: "hidden",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
});

export const cardVariants = styleVariants({
  default: [cardBase],
  elevated: [
    cardBase,
    {
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      ":hover": {
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
      },
    },
  ],
  outlined: [
    cardBase,
    {
      border: `2px solid ${vars.colors.border}`,
    },
  ],
});

export const cardHeader = style({
  padding: vars.spacing.medium,
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const cardTitle = style({
  fontSize: vars.typography.fontSize.large,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  margin: 0,
  marginBottom: "0.25rem",
});

export const cardDescription = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  margin: 0,
});

export const cardContent = style({
  padding: vars.spacing.medium,
});

export const cardFooter = style({
  padding: vars.spacing.medium,
  borderTop: `1px solid ${vars.colors.border}`,
  backgroundColor: vars.colors.muted,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const cardMedia = style({
  width: "100%",
  height: "auto",
  display: "block",
});

export const cardMediaContainer = style({
  position: "relative",
  overflow: "hidden",
});

export const statCard = recipe({
  base: [
    cardBase,
    {
      padding: vars.spacing.medium,
      textAlign: "center",
    },
  ],
  variants: {
    color: {
      default: {},
      primary: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.accentForeground,
        border: `1px solid ${vars.colors.primary}`,
      },
      success: {
        backgroundColor: "#10b981",
        color: "white",
        border: "1px solid #10b981",
      },
      warning: {
        backgroundColor: "#f59e0b",
        color: "white",
        border: "1px solid #f59e0b",
      },
      danger: {
        backgroundColor: "#ef4444",
        color: "white",
        border: "1px solid #ef4444",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export const statValue = style({
  fontSize: vars.typography.fontSize["2xl"],
  fontWeight: vars.typography.fontWeight.bold,
  margin: 0,
  marginBottom: "0.25rem",
});

export const statLabel = style({
  fontSize: vars.typography.fontSize.small,
  opacity: 0.8,
  margin: 0,
});

export const statChange = style({
  fontSize: vars.typography.fontSize.small,
  fontWeight: vars.typography.fontWeight.medium,
  marginTop: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.25rem",
});

export const statChangePositive = style({
  color: "#10b981",
});

export const statChangeNegative = style({
  color: "#ef4444",
});
