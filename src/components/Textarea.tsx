import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import * as styles from "./Textarea.css";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Size variant of the textarea */
  size?: "small" | "medium" | "large";
  /** Visual variant of the textarea */
  variant?: "default" | "error" | "success";
  /** Whether the textarea should take full width */
  fullWidth?: boolean;
  /** Whether the textarea should auto-resize based on content */
  autoResize?: boolean;
  /** Maximum height for auto-resize (in pixels) */
  maxHeight?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = "",
      size = "medium",
      variant = "default",
      fullWidth = true,
      autoResize = false,
      maxHeight = 400,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Calculate the new height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);

      // Set the new height
      textarea.style.height = `${newHeight}px`;

      // Add scrollbar if content exceeds maxHeight
      if (textarea.scrollHeight > maxHeight) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    }, [autoResize, maxHeight, textareaRef]);

    // Handle value changes
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event);
        adjustHeight();
      },
      [onChange, adjustHeight]
    );

    // Auto-resize on mount and when content changes
    useEffect(() => {
      adjustHeight();
    }, [adjustHeight, props.value, props.defaultValue]);

    // Observe resize events if ResizeObserver is available
    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize || typeof ResizeObserver === "undefined") {
        return;
      }

      const resizeObserver = new ResizeObserver(() => {
        adjustHeight();
      });

      resizeObserver.observe(textarea);

      return () => {
        resizeObserver.disconnect();
      };
    }, [adjustHeight, autoResize, textareaRef]);

    return (
      <textarea
        ref={textareaRef}
        className={`${styles.textarea({
          size,
          variant,
          fullWidth,
          autoResize,
        })} ${className}`}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
