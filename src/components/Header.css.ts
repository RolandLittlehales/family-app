import { style } from "@vanilla-extract/css";

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 1000,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  transition: "all 0.2s ease-in-out",
  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: "rgba(17, 17, 17, 0.95)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    },
  },
});

export const headerContainer = style({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "4rem",
  "@media": {
    "(max-width: 768px)": {
      padding: "0 1rem",
      height: "3.5rem",
    },
  },
});

export const logo = style({
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#111827",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  transition: "color 0.2s ease-in-out",
  ":hover": {
    color: "#4F46E5",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#F9FAFB",
      ":hover": {
        color: "#818CF8",
      },
    },
    "(max-width: 768px)": {
      fontSize: "1.25rem",
    },
  },
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
});

export const navLink = style({
  position: "relative",
  color: "#6B7280",
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: "500",
  padding: "0.5rem 0",
  transition: "color 0.2s ease-in-out",
  ":hover": {
    color: "#111827",
  },
  ":after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    backgroundColor: "#4F46E5",
    transition: "width 0.3s ease-in-out",
  },
  selectors: {
    "&:hover::after": {
      width: "100%",
    },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#9CA3AF",
      ":hover": {
        color: "#F9FAFB",
      },
      ":after": {
        backgroundColor: "#818CF8",
      },
    },
  },
});

export const activeNavLink = style([
  navLink,
  {
    color: "#4F46E5",
    selectors: {
      "&::after": {
        width: "100%",
      },
    },
    "@media": {
      "(prefers-color-scheme: dark)": {
        color: "#818CF8",
      },
    },
  },
]);

export const mobileMenuButton = style({
  display: "none",
  background: "none",
  border: "none",
  color: "#6B7280",
  cursor: "pointer",
  padding: "0.5rem",
  borderRadius: "0.375rem",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#111827",
  },
  "@media": {
    "(max-width: 768px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "(prefers-color-scheme: dark)": {
      color: "#9CA3AF",
      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "#F9FAFB",
      },
    },
  },
});

export const mobileMenu = style({
  display: "none",
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "#FFFFFF",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "@media": {
    "(max-width: 768px)": {
      display: "block",
    },
    "(prefers-color-scheme: dark)": {
      backgroundColor: "#111827",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    },
  },
});

export const mobileMenuOpen = style([
  mobileMenu,
  {
    display: "block",
  },
]);

export const mobileMenuList = style({
  padding: "1rem 0",
  display: "flex",
  flexDirection: "column",
});

export const mobileMenuLink = style({
  display: "block",
  padding: "0.75rem 1.5rem",
  color: "#6B7280",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "500",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#111827",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#9CA3AF",
      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "#F9FAFB",
      },
    },
  },
});

export const activeMobileMenuLink = style([
  mobileMenuLink,
  {
    color: "#4F46E5",
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    "@media": {
      "(prefers-color-scheme: dark)": {
        color: "#818CF8",
        backgroundColor: "rgba(129, 140, 248, 0.1)",
      },
    },
  },
]);

export const userMenu = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
});

export const userName = style({
  color: "#6B7280",
  fontSize: "0.875rem",
  fontWeight: "500",
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#9CA3AF",
    },
  },
});

export const signOutButton = style({
  background: "none",
  border: "1px solid #D1D5DB",
  color: "#6B7280",
  fontSize: "0.875rem",
  fontWeight: "500",
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  ":hover": {
    backgroundColor: "#F3F4F6",
    borderColor: "#9CA3AF",
    color: "#374151",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      borderColor: "#374151",
      color: "#9CA3AF",
      ":hover": {
        backgroundColor: "#1F2937",
        borderColor: "#6B7280",
        color: "#F3F4F6",
      },
    },
  },
});
