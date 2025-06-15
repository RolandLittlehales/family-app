import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const tableContainer = style({
  width: "100%",
  overflowX: "auto",
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.medium,
  backgroundColor: vars.colors.background,
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: vars.typography.fontSize.base,
});

export const tableHeader = style({
  backgroundColor: vars.colors.muted,
  borderBottom: `2px solid ${vars.colors.border}`,
});

export const tableHeaderCell = style({
  padding: `${vars.spacing.medium} ${vars.spacing.small}`,
  textAlign: "left",
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  position: "relative",
  cursor: "pointer",
  userSelect: "none",
  transition: "background-color 0.2s ease-in-out",

  ":hover": {
    backgroundColor: vars.colors.border,
  },

  selectors: {
    "&[data-sortable='true']": {
      paddingRight: vars.spacing.large,
    },
  },
});

export const sortIcon = style({
  position: "absolute",
  right: vars.spacing.small,
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0.5,
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&[data-active='true']": {
      opacity: 1,
    },
  },
});

export const tableBody = style({});

export const tableRow = style({
  borderBottom: `1px solid ${vars.colors.border}`,
  transition: "background-color 0.2s ease-in-out",

  ":hover": {
    backgroundColor: vars.colors.muted,
  },

  ":last-child": {
    borderBottom: "none",
  },
});

export const tableCell = style({
  padding: `${vars.spacing.medium} ${vars.spacing.small}`,
  color: vars.colors.foreground,
  verticalAlign: "middle",
});

export const tableCellVariants = styleVariants({
  default: [tableCell],
  numeric: [
    tableCell,
    {
      textAlign: "right",
      fontVariantNumeric: "tabular-nums",
    },
  ],
  center: [
    tableCell,
    {
      textAlign: "center",
    },
  ],
});

export const tableFooter = style({
  backgroundColor: vars.colors.muted,
  borderTop: `1px solid ${vars.colors.border}`,
  padding: vars.spacing.medium,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: vars.spacing.medium,
});

export const pagination = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.small,
});

export const paginationButton = style({
  padding: `${vars.spacing.small} ${vars.spacing.medium}`,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.small,
  backgroundColor: vars.colors.background,
  color: vars.colors.foreground,
  cursor: "pointer",
  fontSize: vars.typography.fontSize.small,
  transition: "all 0.2s ease-in-out",

  ":hover": {
    backgroundColor: vars.colors.muted,
  },

  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const paginationButtonActive = style([
  paginationButton,
  {
    backgroundColor: vars.colors.primary,
    color: vars.colors.accentForeground,
    borderColor: vars.colors.primary,
  },
]);

export const paginationInfo = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
});

export const emptyState = style({
  padding: vars.spacing.xlarge,
  textAlign: "center",
  color: vars.colors.mutedForeground,
});

export const loadingState = style({
  padding: vars.spacing.xlarge,
  textAlign: "center",
  color: vars.colors.mutedForeground,
  position: "relative",
});

export const loadingSpinner = style({
  display: "inline-block",
  width: "20px",
  height: "20px",
  border: "2px solid transparent",
  borderTop: `2px solid ${vars.colors.primary}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginRight: vars.spacing.small,
});

export const tableCaption = style({
  padding: vars.spacing.medium,
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.mutedForeground,
  textAlign: "left",
  borderBottom: `1px solid ${vars.colors.border}`,
});
