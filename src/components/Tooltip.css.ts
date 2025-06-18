import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../styles/theme.css";

export const tooltipTrigger = style({
  display: "inline-block",
  position: "relative",
});

export const tooltipContent = recipe({
  base: {
    position: "absolute",
    zIndex: 1000,
    padding: `${vars.spacing.small} ${vars.spacing.medium}`,
    backgroundColor: vars.colors.foreground,
    color: vars.colors.background,
    fontSize: vars.typography.fontSize.small,
    borderRadius: vars.radii.small,
    whiteSpace: "nowrap",
    maxWidth: "320px",
    wordWrap: "break-word",
    pointerEvents: "none",
    opacity: 0,
    transform: "scale(0.95)",
    transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  variants: {
    position: {
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%) translateY(-8px) scale(0.95)",
        marginBottom: "8px",
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%) translateY(8px) scale(0.95)",
        marginTop: "8px",
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%) translateX(-8px) scale(0.95)",
        marginRight: "8px",
      },
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%) translateX(8px) scale(0.95)",
        marginLeft: "8px",
      },
    },
    visible: {
      true: {
        opacity: 1,
        transform: "scale(1)",
      },
    },
    size: {
      small: {
        padding: `4px ${vars.spacing.small}`,
        fontSize: "0.75rem",
      },
      medium: {
        padding: `${vars.spacing.small} ${vars.spacing.medium}`,
        fontSize: vars.typography.fontSize.small,
      },
      large: {
        padding: `${vars.spacing.medium} ${vars.spacing.large}`,
        fontSize: vars.typography.fontSize.base,
        maxWidth: "400px",
      },
    },
  },
  compoundVariants: [
    {
      variants: { position: "top", visible: true },
      style: {
        transform: "translateX(-50%) translateY(-8px) scale(1)",
      },
    },
    {
      variants: { position: "bottom", visible: true },
      style: {
        transform: "translateX(-50%) translateY(8px) scale(1)",
      },
    },
    {
      variants: { position: "left", visible: true },
      style: {
        transform: "translateY(-50%) translateX(-8px) scale(1)",
      },
    },
    {
      variants: { position: "right", visible: true },
      style: {
        transform: "translateY(-50%) translateX(8px) scale(1)",
      },
    },
  ],
  defaultVariants: {
    position: "top",
    visible: false,
    size: "medium",
  },
});

export const tooltipArrow = recipe({
  base: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
  variants: {
    position: {
      top: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: `6px solid ${vars.colors.foreground}`,
      },
      bottom: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderBottom: `6px solid ${vars.colors.foreground}`,
      },
      left: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "6px solid transparent",
        borderBottom: "6px solid transparent",
        borderLeft: `6px solid ${vars.colors.foreground}`,
      },
      right: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        borderTop: "6px solid transparent",
        borderBottom: "6px solid transparent",
        borderRight: `6px solid ${vars.colors.foreground}`,
      },
    },
  },
  defaultVariants: {
    position: "top",
  },
});

export const popoverTrigger = style({
  display: "inline-block",
  position: "relative",
});

export const popoverContent = recipe({
  base: {
    position: "absolute",
    zIndex: 1000,
    padding: vars.spacing.medium,
    backgroundColor: vars.colors.background,
    border: `1px solid ${vars.colors.border}`,
    borderRadius: vars.radii.medium,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    minWidth: "200px",
    maxWidth: "400px",
    opacity: 0,
    transform: "scale(0.95)",
    transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
  },
  variants: {
    position: {
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%) translateY(-8px) scale(0.95)",
        marginBottom: "8px",
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%) translateY(8px) scale(0.95)",
        marginTop: "8px",
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%) translateX(-8px) scale(0.95)",
        marginRight: "8px",
      },
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%) translateX(8px) scale(0.95)",
        marginLeft: "8px",
      },
    },
    visible: {
      true: {
        opacity: 1,
        transform: "scale(1)",
      },
    },
  },
  compoundVariants: [
    {
      variants: { position: "top", visible: true },
      style: {
        transform: "translateX(-50%) translateY(-8px) scale(1)",
      },
    },
    {
      variants: { position: "bottom", visible: true },
      style: {
        transform: "translateX(-50%) translateY(8px) scale(1)",
      },
    },
    {
      variants: { position: "left", visible: true },
      style: {
        transform: "translateY(-50%) translateX(-8px) scale(1)",
      },
    },
    {
      variants: { position: "right", visible: true },
      style: {
        transform: "translateY(-50%) translateX(8px) scale(1)",
      },
    },
  ],
  defaultVariants: {
    position: "bottom",
    visible: false,
  },
});

export const popoverHeader = style({
  fontSize: vars.typography.fontSize.base,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.foreground,
  marginBottom: vars.spacing.small,
  paddingBottom: vars.spacing.small,
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const popoverBody = style({
  fontSize: vars.typography.fontSize.small,
  color: vars.colors.foreground,
  lineHeight: 1.5,
});

export const popoverFooter = style({
  marginTop: vars.spacing.medium,
  paddingTop: vars.spacing.small,
  borderTop: `1px solid ${vars.colors.border}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.spacing.small,
});

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
  backgroundColor: "transparent",
});
