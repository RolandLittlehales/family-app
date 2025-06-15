"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useAuth } from "../hooks/useAuth";

import * as styles from "./Header.css";

export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderProps {
  navItems?: NavItem[];
  logoText?: string;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/streaming", label: "Streaming" },
];

export function Header({
  navItems = defaultNavItems,
  logoText = "The Family",
  className = "",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          {logoText}
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActiveLink(item.href) ? styles.activeNavLink : styles.navLink
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        {isAuthenticated && user && (
          <div className={styles.userMenu}>
            <span className={styles.userName}>
              {user.name}
            </span>
            <button 
              onClick={() => signOut()}
              className={styles.signOutButton}
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={isMobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenu}
      >
        <nav className={styles.mobileMenuList}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActiveLink(item.href)
                  ? styles.activeMobileMenuLink
                  : styles.mobileMenuLink
              }
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
