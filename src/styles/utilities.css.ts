import { style } from "@vanilla-extract/css";
import { vars, tokens } from "./theme.css";

// Layout utilities
export const container = style({
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: vars.spacing[4],
  paddingRight: vars.spacing[4],

  "@media": {
    [`screen and (min-width: ${tokens.breakpoints.sm})`]: {
      maxWidth: "640px",
    },
    [`screen and (min-width: ${tokens.breakpoints.md})`]: {
      maxWidth: "768px",
    },
    [`screen and (min-width: ${tokens.breakpoints.lg})`]: {
      maxWidth: "1024px",
    },
    [`screen and (min-width: ${tokens.breakpoints.xl})`]: {
      maxWidth: "1280px",
    },
    [`screen and (min-width: ${tokens.breakpoints["2xl"]})`]: {
      maxWidth: "1536px",
    },
  },
});

export const containerFluid = style({
  width: "100%",
  paddingLeft: vars.spacing[4],
  paddingRight: vars.spacing[4],
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
  gap: vars.spacing[1],
});

export const gap2 = style({
  gap: vars.spacing[2],
});

export const gap3 = style({
  gap: vars.spacing[3],
});

export const gap4 = style({
  gap: vars.spacing[4],
});

export const gap6 = style({
  gap: vars.spacing[6],
});

export const gap8 = style({
  gap: vars.spacing[8],
});

// Spacing utilities
export const m0 = style({ margin: vars.spacing[0] });
export const m1 = style({ margin: vars.spacing[1] });
export const m2 = style({ margin: vars.spacing[2] });
export const m3 = style({ margin: vars.spacing[3] });
export const m4 = style({ margin: vars.spacing[4] });
export const m6 = style({ margin: vars.spacing[6] });
export const m8 = style({ margin: vars.spacing[8] });

export const mt0 = style({ marginTop: vars.spacing[0] });
export const mt1 = style({ marginTop: vars.spacing[1] });
export const mt2 = style({ marginTop: vars.spacing[2] });
export const mt3 = style({ marginTop: vars.spacing[3] });
export const mt4 = style({ marginTop: vars.spacing[4] });
export const mt6 = style({ marginTop: vars.spacing[6] });
export const mt8 = style({ marginTop: vars.spacing[8] });

export const mb0 = style({ marginBottom: vars.spacing[0] });
export const mb1 = style({ marginBottom: vars.spacing[1] });
export const mb2 = style({ marginBottom: vars.spacing[2] });
export const mb3 = style({ marginBottom: vars.spacing[3] });
export const mb4 = style({ marginBottom: vars.spacing[4] });
export const mb6 = style({ marginBottom: vars.spacing[6] });
export const mb8 = style({ marginBottom: vars.spacing[8] });

export const ml0 = style({ marginLeft: vars.spacing[0] });
export const ml1 = style({ marginLeft: vars.spacing[1] });
export const ml2 = style({ marginLeft: vars.spacing[2] });
export const ml3 = style({ marginLeft: vars.spacing[3] });
export const ml4 = style({ marginLeft: vars.spacing[4] });
export const ml6 = style({ marginLeft: vars.spacing[6] });
export const ml8 = style({ marginLeft: vars.spacing[8] });

export const mr0 = style({ marginRight: vars.spacing[0] });
export const mr1 = style({ marginRight: vars.spacing[1] });
export const mr2 = style({ marginRight: vars.spacing[2] });
export const mr3 = style({ marginRight: vars.spacing[3] });
export const mr4 = style({ marginRight: vars.spacing[4] });
export const mr6 = style({ marginRight: vars.spacing[6] });
export const mr8 = style({ marginRight: vars.spacing[8] });

export const p0 = style({ padding: vars.spacing[0] });
export const p1 = style({ padding: vars.spacing[1] });
export const p2 = style({ padding: vars.spacing[2] });
export const p3 = style({ padding: vars.spacing[3] });
export const p4 = style({ padding: vars.spacing[4] });
export const p6 = style({ padding: vars.spacing[6] });
export const p8 = style({ padding: vars.spacing[8] });

export const pt0 = style({ paddingTop: vars.spacing[0] });
export const pt1 = style({ paddingTop: vars.spacing[1] });
export const pt2 = style({ paddingTop: vars.spacing[2] });
export const pt3 = style({ paddingTop: vars.spacing[3] });
export const pt4 = style({ paddingTop: vars.spacing[4] });
export const pt6 = style({ paddingTop: vars.spacing[6] });
export const pt8 = style({ paddingTop: vars.spacing[8] });

export const pb0 = style({ paddingBottom: vars.spacing[0] });
export const pb1 = style({ paddingBottom: vars.spacing[1] });
export const pb2 = style({ paddingBottom: vars.spacing[2] });
export const pb3 = style({ paddingBottom: vars.spacing[3] });
export const pb4 = style({ paddingBottom: vars.spacing[4] });
export const pb6 = style({ paddingBottom: vars.spacing[6] });
export const pb8 = style({ paddingBottom: vars.spacing[8] });

export const pl0 = style({ paddingLeft: vars.spacing[0] });
export const pl1 = style({ paddingLeft: vars.spacing[1] });
export const pl2 = style({ paddingLeft: vars.spacing[2] });
export const pl3 = style({ paddingLeft: vars.spacing[3] });
export const pl4 = style({ paddingLeft: vars.spacing[4] });
export const pl6 = style({ paddingLeft: vars.spacing[6] });
export const pl8 = style({ paddingLeft: vars.spacing[8] });

export const pr0 = style({ paddingRight: vars.spacing[0] });
export const pr1 = style({ paddingRight: vars.spacing[1] });
export const pr2 = style({ paddingRight: vars.spacing[2] });
export const pr3 = style({ paddingRight: vars.spacing[3] });
export const pr4 = style({ paddingRight: vars.spacing[4] });
export const pr6 = style({ paddingRight: vars.spacing[6] });
export const pr8 = style({ paddingRight: vars.spacing[8] });

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
  fontSize: tokens.typography.fontSize.xs,
});

export const textSm = style({
  fontSize: tokens.typography.fontSize.sm,
});

export const textBase = style({
  fontSize: tokens.typography.fontSize.base,
});

export const textLg = style({
  fontSize: tokens.typography.fontSize.lg,
});

export const textXl = style({
  fontSize: tokens.typography.fontSize.xl,
});

export const text2xl = style({
  fontSize: tokens.typography.fontSize["2xl"],
});

export const text3xl = style({
  fontSize: tokens.typography.fontSize["3xl"],
});

export const text4xl = style({
  fontSize: tokens.typography.fontSize["4xl"],
});

export const fontLight = style({
  fontWeight: tokens.typography.fontWeight.light,
});

export const fontNormal = style({
  fontWeight: tokens.typography.fontWeight.normal,
});

export const fontMedium = style({
  fontWeight: tokens.typography.fontWeight.medium,
});

export const fontSemibold = style({
  fontWeight: tokens.typography.fontWeight.semibold,
});

export const fontBold = style({
  fontWeight: tokens.typography.fontWeight.bold,
});

// Color utilities
export const textPrimary = style({
  color: vars.color.text.primary,
});

export const textSecondary = style({
  color: vars.color.text.secondary,
});

export const textTertiary = style({
  color: vars.color.text.tertiary,
});

export const textBrand = style({
  color: vars.color.brand.primary,
});

export const textSuccess = style({
  color: vars.color.semantic.success,
});

export const textWarning = style({
  color: vars.color.semantic.warning,
});

export const textError = style({
  color: vars.color.semantic.error,
});

export const textInfo = style({
  color: vars.color.semantic.info,
});

// Background utilities
export const bgPrimary = style({
  backgroundColor: vars.color.background.primary,
});

export const bgSecondary = style({
  backgroundColor: vars.color.background.secondary,
});

export const bgTertiary = style({
  backgroundColor: vars.color.background.tertiary,
});

export const bgBrand = style({
  backgroundColor: vars.color.brand.primary,
});

export const bgSuccess = style({
  backgroundColor: vars.color.semantic.successBackground,
});

export const bgWarning = style({
  backgroundColor: vars.color.semantic.warningBackground,
});

export const bgError = style({
  backgroundColor: vars.color.semantic.errorBackground,
});

export const bgInfo = style({
  backgroundColor: vars.color.semantic.infoBackground,
});

// Border utilities
export const border = style({
  border: `1px solid ${vars.color.border.primary}`,
});

export const borderPrimary = style({
  borderColor: vars.color.border.primary,
});

export const borderSecondary = style({
  borderColor: vars.color.border.secondary,
});

export const borderFocus = style({
  borderColor: vars.color.border.focus,
});

export const borderError = style({
  borderColor: vars.color.border.error,
});

export const rounded = style({
  borderRadius: vars.borderRadius.base,
});

export const roundedSm = style({
  borderRadius: vars.borderRadius.sm,
});

export const roundedMd = style({
  borderRadius: vars.borderRadius.md,
});

export const roundedLg = style({
  borderRadius: vars.borderRadius.lg,
});

export const roundedXl = style({
  borderRadius: vars.borderRadius.xl,
});

export const roundedFull = style({
  borderRadius: vars.borderRadius.full,
});

// Shadow utilities
export const shadow = style({
  boxShadow: vars.boxShadow.base,
});

export const shadowSm = style({
  boxShadow: vars.boxShadow.sm,
});

export const shadowMd = style({
  boxShadow: vars.boxShadow.md,
});

export const shadowLg = style({
  boxShadow: vars.boxShadow.lg,
});

export const shadowXl = style({
  boxShadow: vars.boxShadow.xl,
});

export const shadow2xl = style({
  boxShadow: vars.boxShadow["2xl"],
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

// Overflow utilities
export const overflowHidden = style({
  overflow: "hidden",
});

export const overflowAuto = style({
  overflow: "auto",
});

export const overflowScroll = style({
  overflow: "scroll",
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

// Accessibility utilities
export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
});

// Transition utilities
export const transition = style({
  transition: `all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut}`,
});

export const transitionFast = style({
  transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut}`,
});

export const transitionSlow = style({
  transition: `all ${tokens.animation.duration.slow} ${tokens.animation.easing.easeInOut}`,
});

// Focus utilities
export const focusRing = style({
  ":focus": {
    outline: `2px solid ${vars.color.border.focus}`,
    outlineOffset: "2px",
  },
  ":focus:not(:focus-visible)": {
    outline: "none",
  },
});
