import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const listContainer = style({
  width: "100%",
  backgroundColor: vars.colors.background,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.medium,
  overflow: "hidden",
});

export const listVariants = styleVariants({
  simple: [listContainer],
  bordered: [
    listContainer,
    {
      border: `2px solid ${vars.colors.border}`,
    },
  ],
  elevated: [
    listContainer,
    {
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
  ],
});

export const listItem = style({
  padding: vars.spacing.medium,
  borderBottom: `1px solid ${vars.colors.border}`,
  transition: "background-color 0.2s ease-in-out",
  cursor: "default",

  ":last-child": {
    borderBottom: "none",
  },
});

export const listItemVariants = styleVariants({
  default: [listItem],
  interactive: [
    listItem,
    {
      cursor: "pointer",
      ":hover": {
        backgroundColor: vars.colors.muted,
      },
    },
  ],
  selected: [
    listItem,
    {
      backgroundColor: vars.colors.accent,
      color: vars.colors.accentForeground,
    },
  ],
});

export const listItemContent = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.medium,
});

export const listItemIcon = style({
  flexShrink: 0,
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const listItemText = style({
  flex: 1,
  minWidth: 0,
});

export const listItemTitle = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.medium,
  color: vars.colors.foreground,
  margin: 0,
  marginBottom: "0.25rem",
});

export const listItemDescription = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  margin: 0,
  lineHeight: 1.4,
});

export const listItemMeta = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  flexShrink: 0,
});

export const listItemActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
  flexShrink: 0,
});

export const listHeader = style({
  padding: vars.spacing.medium,
  backgroundColor: vars.colors.muted,
  borderBottom: `1px solid ${vars.colors.border}`,
  fontSize: vars.typography.fontSize.small,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  textTransform: "uppercase",
  letterSpacing: "0.025em",
});

export const emptyList = style({
  padding: vars.spacing.xlarge,
  textAlign: "center",
  color: vars.colors.mutedForeground,
  fontSize: vars.typography.fontSize.base,
});

export const loadingList = style({
  padding: vars.spacing.xlarge,
  textAlign: "center",
  color: vars.colors.mutedForeground,
  fontSize: vars.typography.fontSize.base,
});

export const listDivider = style({
  height: "1px",
  backgroundColor: vars.colors.border,
  margin: `${vars.spacing.small} 0`,
});

export const listGroup = style({
  marginBottom: vars.spacing.medium,

  ":last-child": {
    marginBottom: 0,
  },
});

export const listGroupHeader = style({
  padding: `${vars.spacing.small} ${vars.spacing.medium}`,
  backgroundColor: vars.colors.muted,
  fontSize: vars.typography.fontSize.small,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const checkbox = style({
  width: "16px",
  height: "16px",
  accentColor: vars.colors.primary,
});

export const checkboxLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
  cursor: "pointer",
  width: "100%",
});

export const checkboxText = style({
  flex: 1,
  selectors: {
    [`${checkboxLabel}:has(input:checked) &`]: {
      textDecoration: "line-through",
      opacity: 0.6,
    },
  },
});
