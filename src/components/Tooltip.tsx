"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as styles from "./Tooltip.css";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  size?: "small" | "medium" | "large";
  showArrow?: boolean;
  delay?: number;
  disabled?: boolean;
  className?: string;
}

export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "click" | "hover";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  size = "medium",
  showArrow = true,
  delay = 500,
  disabled = false,
  className = "",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const contentClass = styles.tooltipContent({ position, visible, size });
  const arrowClass = styles.tooltipArrow({ position });

  return (
    <div
      ref={triggerRef}
      className={`${styles.tooltipTrigger} ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {visible && (
        <div className={contentClass}>
          {content}
          {showArrow && <div className={arrowClass} />}
        </div>
      )}
    </div>
  );
}

export function Popover({
  content,
  children,
  title,
  footer,
  position = "bottom",
  trigger = "click",
  open: controlledOpen,
  onOpenChange,
  className = "",
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [isControlled, onOpenChange]
  );

  const handleTriggerClick = () => {
    if (trigger === "click") {
      setOpen(!open);
    }
  };

  const handleTriggerMouseEnter = () => {
    if (trigger === "hover") {
      setOpen(true);
    }
  };

  const handleTriggerMouseLeave = () => {
    if (trigger === "hover") {
      setOpen(false);
    }
  };

  const handleOverlayClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    if (trigger === "click") {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, trigger, setOpen]);

  const contentClass = styles.popoverContent({ position, visible: open });

  return (
    <>
      <div
        ref={triggerRef}
        className={`${styles.popoverTrigger} ${className}`}
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
      >
        {children}
      </div>

      {open && trigger === "click" && (
        <div className={styles.overlay} onClick={handleOverlayClick} />
      )}

      {open && (
        <div ref={contentRef} className={contentClass}>
          {title && <div className={styles.popoverHeader}>{title}</div>}
          <div className={styles.popoverBody}>{content}</div>
          {footer && <div className={styles.popoverFooter}>{footer}</div>}
        </div>
      )}
    </>
  );
}

Tooltip.Popover = Popover;
