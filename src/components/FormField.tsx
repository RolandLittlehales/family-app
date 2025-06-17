import React from "react";
import * as styles from "./FormField.css";

export interface FormFieldProps {
  /** Label text for the field */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Help text to display below the input */
  helpText?: string;
  /** Error message to display */
  error?: string;
  /** Success message to display */
  success?: string;
  /** The form control element (input, textarea, select, etc.) */
  children: React.ReactElement;
  /** Additional CSS class */
  className?: string;
}

export function FormField({
  label,
  required = false,
  helpText,
  error,
  success,
  children,
  className = "",
}: FormFieldProps) {
  // Generate unique IDs for accessibility
  const fieldId = React.useId();
  const helpTextId = helpText ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const successId = success ? `${fieldId}-success` : undefined;

  // Determine which variant to use based on error/success state
  const variant = error ? "error" : success ? "success" : "default";

  // Clone the child element to add necessary props
  const childWithProps = React.cloneElement(children, {
    id: fieldId,
    variant,
    "aria-describedby":
      [helpTextId, errorId, successId].filter(Boolean).join(" ") || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-required": required ? true : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <div className={`${styles.formField} ${className}`}>
      {label && (
        <label
          htmlFor={fieldId}
          className={`${styles.label} ${required ? styles.labelRequired : ""}`}
        >
          {label}
        </label>
      )}

      <div className={styles.fieldWrapper}>{childWithProps}</div>

      {helpText && (
        <div id={helpTextId} className={styles.helpText}>
          {helpText}
        </div>
      )}

      {error && (
        <div id={errorId} className={styles.errorMessage} role="alert">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM7 3h2v6H7V3zm0 8h2v2H7v-2z" />
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div id={successId} className={styles.successMessage}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.35 6.35L6.7 11l-.7-.7-2.65-2.65 1.4-1.4L6.7 8.2l3.95-3.95 1.4 1.4z" />
          </svg>
          {success}
        </div>
      )}
    </div>
  );
}
