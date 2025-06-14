import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  padding: vars.spacing.xlarge,
  maxWidth: "1200px",
  margin: "0 auto",
  minHeight: "calc(100vh - 80px)", // Account for header height
});

export const title = style({
  fontSize: vars.typography.fontSize["3xl"],
  fontWeight: vars.typography.fontWeight.bold,
  marginBottom: vars.spacing.large,
  color: vars.colors.foreground,
  background: `linear-gradient(135deg, ${vars.colors.primary}, ${vars.colors.accent})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
});

export const subtitle = style({
  fontSize: vars.typography.fontSize.large,
  color: vars.colors.mutedForeground,
  marginBottom: vars.spacing.xlarge,
  lineHeight: "1.6",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: vars.spacing.large,
  marginTop: vars.spacing.xlarge,
});

export const card = style({
  padding: vars.spacing.large,
  backgroundColor: vars.colors.background,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.large,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  transition: "all 0.2s ease",
  cursor: "pointer",

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    borderColor: vars.colors.primary,
  },
});

export const cardIcon = style({
  width: "48px",
  height: "48px",
  borderRadius: vars.radii.medium,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: vars.spacing.medium,
  fontSize: "1.5rem",
});

export const watchlistIcon = style([
  cardIcon,
  {
    backgroundColor: `${vars.colors.primary}20`,
    color: vars.colors.primary,
  },
]);

export const currentlyWatchingIcon = style([
  cardIcon,
  {
    backgroundColor: `${vars.colors.accent}20`,
    color: vars.colors.accent,
  },
]);

export const favoritesIcon = style([
  cardIcon,
  {
    backgroundColor: `${vars.colors.accent}20`,
    color: vars.colors.accent,
  },
]);

export const servicesIcon = style([
  cardIcon,
  {
    backgroundColor: `${vars.colors.primary}20`,
    color: vars.colors.primary,
  },
]);

export const cardTitle = style({
  fontSize: vars.typography.fontSize.xlarge,
  fontWeight: vars.typography.fontWeight.semibold,
  marginBottom: vars.spacing.small,
  color: vars.colors.foreground,
});

export const cardDescription = style({
  color: vars.colors.mutedForeground,
  lineHeight: "1.5",
});

export const statsContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: vars.spacing.medium,
  marginBottom: vars.spacing.xlarge,
});

export const statCard = style({
  padding: vars.spacing.medium,
  backgroundColor: vars.colors.muted,
  borderRadius: vars.radii.medium,
  textAlign: "center",
});

export const statNumber = style({
  fontSize: vars.typography.fontSize["2xl"],
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.colors.primary,
  display: "block",
});

export const statLabel = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginTop: vars.spacing.small,
});

export const servicesGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: vars.spacing.medium,
  marginTop: vars.spacing.large,
});

export const serviceCard = style({
  padding: vars.spacing.medium,
  backgroundColor: vars.colors.background,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.medium,
  textAlign: "center",
  transition: "all 0.2s ease",

  ":hover": {
    borderColor: vars.colors.primary,
    transform: "translateY(-1px)",
  },
});

export const serviceName = style({
  fontSize: vars.typography.fontSize.small,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  marginTop: vars.spacing.small,
});
