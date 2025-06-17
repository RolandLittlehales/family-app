import React from "react";
import Image from "next/image";
import * as styles from "./Card.css";

export interface CardProps {
  variant?: "default" | "elevated" | "outlined";
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardMediaProps {
  src: string;
  alt: string;
  className?: string;
}

export interface StatCardProps {
  value: string | number;
  label: string;
  change?: {
    value: string | number;
    type: "positive" | "negative";
  };
  color?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
}

export function Card({
  variant = "default",
  children,
  className = "",
}: CardProps) {
  return (
    <div className={`${styles.cardVariants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  children,
  className = "",
}: CardHeaderProps) {
  return (
    <div className={`${styles.cardHeader} ${className}`}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {description && <p className={styles.cardDescription}>{description}</p>}
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`${styles.cardContent} ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`${styles.cardFooter} ${className}`}>{children}</div>;
}

export function CardMedia({ src, alt, className = "" }: CardMediaProps) {
  return (
    <div className={styles.cardMediaContainer}>
      <Image
        src={src}
        alt={alt}
        className={`${styles.cardMedia} ${className}`}
        width={400}
        height={250}
      />
    </div>
  );
}

export function StatCard({
  value,
  label,
  change,
  color = "default",
  className = "",
}: StatCardProps) {
  const cardClassName = styles.statCard({ color });

  return (
    <div className={`${cardClassName} ${className}`}>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
      {change && (
        <div
          className={`${styles.statChange} ${
            change.type === "positive"
              ? styles.statChangePositive
              : styles.statChangeNegative
          }`}
        >
          <span>{change.type === "positive" ? "↗" : "↘"}</span>
          <span>{change.value}</span>
        </div>
      )}
    </div>
  );
}
