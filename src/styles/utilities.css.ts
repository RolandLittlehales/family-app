import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

// Layout utilities
export const container = style({
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: vars.spacing.medium,
  paddingRight: vars.spacing.medium,

  "@media": {
    "screen and (min-width: 640px)": {
      maxWidth: "640px",
    },
    "screen and (min-width: 768px)": {
      maxWidth: "768px",
    },
    "screen and (min-width: 1024px)": {
      maxWidth: "1024px",
    },
    "screen and (min-width: 1280px)": {
      maxWidth: "1280px",
    },
    "screen and (min-width: 1536px)": {
      maxWidth: "1536px",
    },
  },
});

export const containerFluid = style({
  width: "100%",
  paddingLeft: vars.spacing.medium,
  paddingRight: vars.spacing.medium,
});

// Flexbox utilities
export const flex = style({
  display: "flex",
});

export const flexCol = style({
  display: "flex",
  flexDirection: "column",
});

export const flexRow = style({
  display: "flex",
  flexDirection: "row",
});

export const flexWrap = style({
  flexWrap: "wrap",
});

export const flexNoWrap = style({
  flexWrap: "nowrap",
});

export const justifyStart = style({
  justifyContent: "flex-start",
});

export const justifyEnd = style({
  justifyContent: "flex-end",
});

export const justifyCenter = style({
  justifyContent: "center",
});

export const justifyBetween = style({
  justifyContent: "space-between",
});

export const justifyAround = style({
  justifyContent: "space-around",
});

export const justifyEvenly = style({
  justifyContent: "space-evenly",
});

export const itemsStart = style({
  alignItems: "flex-start",
});

export const itemsEnd = style({
  alignItems: "flex-end",
});

export const itemsCenter = style({
  alignItems: "center",
});

export const itemsBaseline = style({
  alignItems: "baseline",
});

export const itemsStretch = style({
  alignItems: "stretch",
});

// Grid utilities
export const grid = style({
  display: "grid",
});

export const gridCols1 = style({
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
});

export const gridCols2 = style({
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
});

export const gridCols3 = style({
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
});

export const gridCols4 = style({
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
});

export const gridCols6 = style({
  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
});

export const gridCols12 = style({
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
});

export const gap1 = style({
  gap: vars.spacing.small,
});

export const gap2 = style({
  gap: vars.spacing.medium,
});

export const gap3 = style({
  gap: vars.spacing.large,
});

export const gap4 = style({
  gap: vars.spacing.xlarge,
});

// Spacing utilities
export const m0 = style({ margin: "0" });
export const m1 = style({ margin: vars.spacing.small });
export const m2 = style({ margin: vars.spacing.medium });
export const m3 = style({ margin: vars.spacing.large });
export const m4 = style({ margin: vars.spacing.xlarge });

export const mt0 = style({ marginTop: "0" });
export const mt1 = style({ marginTop: vars.spacing.small });
export const mt2 = style({ marginTop: vars.spacing.medium });
export const mt3 = style({ marginTop: vars.spacing.large });
export const mt4 = style({ marginTop: vars.spacing.xlarge });

export const mr0 = style({ marginRight: "0" });
export const mr1 = style({ marginRight: vars.spacing.small });
export const mr2 = style({ marginRight: vars.spacing.medium });
export const mr3 = style({ marginRight: vars.spacing.large });
export const mr4 = style({ marginRight: vars.spacing.xlarge });

export const mb0 = style({ marginBottom: "0" });
export const mb1 = style({ marginBottom: vars.spacing.small });
export const mb2 = style({ marginBottom: vars.spacing.medium });
export const mb3 = style({ marginBottom: vars.spacing.large });
export const mb4 = style({ marginBottom: vars.spacing.xlarge });

export const ml0 = style({ marginLeft: "0" });
export const ml1 = style({ marginLeft: vars.spacing.small });
export const ml2 = style({ marginLeft: vars.spacing.medium });
export const ml3 = style({ marginLeft: vars.spacing.large });
export const ml4 = style({ marginLeft: vars.spacing.xlarge });

export const p0 = style({ padding: "0" });
export const p1 = style({ padding: vars.spacing.small });
export const p2 = style({ padding: vars.spacing.medium });
export const p3 = style({ padding: vars.spacing.large });
export const p4 = style({ padding: vars.spacing.xlarge });

export const pt0 = style({ paddingTop: "0" });
export const pt1 = style({ paddingTop: vars.spacing.small });
export const pt2 = style({ paddingTop: vars.spacing.medium });
export const pt3 = style({ paddingTop: vars.spacing.large });
export const pt4 = style({ paddingTop: vars.spacing.xlarge });

export const pr0 = style({ paddingRight: "0" });
export const pr1 = style({ paddingRight: vars.spacing.small });
export const pr2 = style({ paddingRight: vars.spacing.medium });
export const pr3 = style({ paddingRight: vars.spacing.large });
export const pr4 = style({ paddingRight: vars.spacing.xlarge });

export const pb0 = style({ paddingBottom: "0" });
export const pb1 = style({ paddingBottom: vars.spacing.small });
export const pb2 = style({ paddingBottom: vars.spacing.medium });
export const pb3 = style({ paddingBottom: vars.spacing.large });
export const pb4 = style({ paddingBottom: vars.spacing.xlarge });

export const pl0 = style({ paddingLeft: "0" });
export const pl1 = style({ paddingLeft: vars.spacing.small });
export const pl2 = style({ paddingLeft: vars.spacing.medium });
export const pl3 = style({ paddingLeft: vars.spacing.large });
export const pl4 = style({ paddingLeft: vars.spacing.xlarge });

// Text utilities
export const textLeft = style({
  textAlign: "left",
});

export const textCenter = style({
  textAlign: "center",
});

export const textRight = style({
  textAlign: "right",
});

export const textJustify = style({
  textAlign: "justify",
});

export const textXs = style({
  fontSize: vars.typography.fontSize.small,
});

export const textSm = style({
  fontSize: vars.typography.fontSize.small,
});

export const textBase = style({
  fontSize: vars.typography.fontSize.base,
});

export const textLg = style({
  fontSize: vars.typography.fontSize.large,
});

export const textXl = style({
  fontSize: vars.typography.fontSize.xlarge,
});

export const text2xl = style({
  fontSize: vars.typography.fontSize["2xl"],
});

export const text3xl = style({
  fontSize: vars.typography.fontSize["3xl"],
});

export const fontLight = style({
  fontWeight: "300",
});

export const fontNormal = style({
  fontWeight: vars.typography.fontWeight.normal,
});

export const fontMedium = style({
  fontWeight: vars.typography.fontWeight.medium,
});

export const fontSemibold = style({
  fontWeight: vars.typography.fontWeight.semibold,
});

export const fontBold = style({
  fontWeight: vars.typography.fontWeight.bold,
});

// Color utilities
export const textPrimary = style({
  color: vars.colors.foreground,
});

export const textSecondary = style({
  color: vars.colors.mutedForeground,
});

export const textMuted = style({
  color: vars.colors.mutedForeground,
});

export const textAccent = style({
  color: vars.colors.accent,
});

export const bgPrimary = style({
  backgroundColor: vars.colors.background,
});

export const bgSecondary = style({
  backgroundColor: vars.colors.muted,
});

export const bgAccent = style({
  backgroundColor: vars.colors.accent,
});

// Border utilities
export const border = style({
  border: `1px solid ${vars.colors.border}`,
});

export const borderT = style({
  borderTop: `1px solid ${vars.colors.border}`,
});

export const borderR = style({
  borderRight: `1px solid ${vars.colors.border}`,
});

export const borderB = style({
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const borderL = style({
  borderLeft: `1px solid ${vars.colors.border}`,
});

export const rounded = style({
  borderRadius: vars.radii.medium,
});

export const roundedSm = style({
  borderRadius: vars.radii.small,
});

export const roundedLg = style({
  borderRadius: vars.radii.large,
});

export const roundedFull = style({
  borderRadius: vars.radii.full,
});

// Shadow utilities
export const shadowSm = style({
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
});

export const shadowMd = style({
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
});

export const shadowLg = style({
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
});

// Position utilities
export const relative = style({
  position: "relative",
});

export const absolute = style({
  position: "absolute",
});

export const fixed = style({
  position: "fixed",
});

export const sticky = style({
  position: "sticky",
});

// Display utilities
export const block = style({
  display: "block",
});

export const inlineBlock = style({
  display: "inline-block",
});

export const inline = style({
  display: "inline",
});

export const hidden = style({
  display: "none",
});

// Width and height utilities
export const wFull = style({
  width: "100%",
});

export const hFull = style({
  height: "100%",
});

export const wScreen = style({
  width: "100vw",
});

export const hScreen = style({
  height: "100vh",
});

// Transition utilities
export const transition = style({
  transition: "all 0.2s ease",
});

export const transitionFast = style({
  transition: "all 0.1s ease",
});

export const transitionSlow = style({
  transition: "all 0.3s ease",
});

// Focus utilities
export const focusRing = style({
  ":focus": {
    outline: `2px solid ${vars.colors.primary}`,
    outlineOffset: "2px",
  },
});
