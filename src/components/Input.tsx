import React, { forwardRef } from "react";
import * as styles from "./Input.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant of the input */
  size?: "small" | "medium" | "large";
  /** Visual variant of the input */
  variant?: "default" | "error" | "success";
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Input type */
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
}

export const Input = React.memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        className = "",
        size = "medium",
        variant = "default",
        fullWidth = true,
        type = "text",
        ...props
      },
      ref
    ) => {
      return (
        <input
          ref={ref}
          type={type}
          className={`${styles.input({ size, variant, fullWidth })} ${className}`}
          {...props}
        />
      );
    }
  )
);

Input.displayName = "Input";
