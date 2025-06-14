import React from "react";
import * as styles from "./PageLayout.css";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  children: React.ReactNode;
}

interface PageSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  subtitle,
  gradient = false,
  children,
}: PageLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1
          className={`${styles.title} ${gradient ? styles.titleGradient : ""}`}
        >
          {title}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function PageSection({
  title,
  children,
  className = "",
}: PageSectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}

export function PageGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles.grid} ${className}`}>{children}</div>;
}

export function StatsGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles.statsGrid} ${className}`}>{children}</div>;
}
