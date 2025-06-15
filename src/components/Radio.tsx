import React, { forwardRef } from "react";
import * as styles from "./Radio.css";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant of the radio button */
  size?: "small" | "medium" | "large";
  /** Visual variant of the radio button */
  variant?: "default" | "error";
  /** Label text for the radio button */
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className = "",
      size = "medium",
      variant = "default",
      label,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;

    return (
      <label
        className={`${styles.radioWrapper} ${
          props.disabled ? styles.radioWrapperDisabled : ""
        } ${className}`}
      >
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={styles.hiddenInput}
          {...props}
        />

        <div className={styles.radioCircle({ size, variant })}>
          <div className={styles.radioDot({ size, variant })} />
        </div>

        {label && <span className={styles.radioLabel({ size })}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
