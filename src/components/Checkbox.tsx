import React, { forwardRef, useEffect } from "react";
import * as styles from "./Checkbox.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant of the checkbox */
  size?: "small" | "medium" | "large";
  /** Visual variant of the checkbox */
  variant?: "default" | "error";
  /** Label text for the checkbox */
  label?: string;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
}

export const Checkbox = React.memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    (
      {
        className = "",
        size = "medium",
        variant = "default",
        label,
        indeterminate = false,
        id,
        ...props
      },
      ref
    ) => {
      const generatedId = React.useId();
      const checkboxId = id || generatedId;
      const internalRef = React.useRef<HTMLInputElement>(null);
      const checkboxRef =
        (ref as React.RefObject<HTMLInputElement>) || internalRef;

      // Handle indeterminate state
      useEffect(() => {
        if (checkboxRef.current) {
          checkboxRef.current.indeterminate = indeterminate;
        }
      }, [indeterminate, checkboxRef]);

      return (
        <label
          className={`${styles.checkboxWrapper} ${
            props.disabled ? styles.checkboxWrapperDisabled : ""
          } ${className}`}
        >
          <input
            ref={checkboxRef}
            type="checkbox"
            id={checkboxId}
            className={styles.hiddenInput}
            {...props}
          />

          <div className={styles.checkboxBox({ size, variant })}>
            {/* Check icon for checked state */}
            <svg
              className={styles.checkIcon}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 4L6 11L3 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Indeterminate icon */}
            <svg
              className={styles.indeterminateIcon}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 8H12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {label && (
            <span className={styles.checkboxLabel({ size })}>{label}</span>
          )}
        </label>
      );
    }
  )
);

Checkbox.displayName = "Checkbox";
