import React, { forwardRef, useState, useRef, useCallback } from "react";
import * as styles from "./FileUpload.css";

export interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "onError"
  > {
  /** Visual variant of the file upload */
  variant?: "default" | "error";
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Allowed file types (MIME types) */
  acceptedTypes?: string[];
  /** Whether multiple files can be selected */
  multiple?: boolean;
  /** Custom text for the upload area */
  text?: string;
  /** Custom subtext for the upload area */
  subtext?: string;
  /** File change handler */
  onChange?: (files: File[]) => void;
  /** Current files */
  files?: File[];
  /** Error handler for rejected files */
  onError?: (errors: string[]) => void;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className = "",
      variant = "default",
      maxSize = 5 * 1024 * 1024, // 5MB default
      acceptedTypes = [],
      multiple = false,
      text = "Click to upload or drag and drop",
      subtext = "SVG, PNG, JPG or GIF (max. 5MB)",
      onChange,
      files = [],
      onError,
      disabled,
      ...props
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleFiles = useCallback(
      (fileList: FileList) => {
        const validFiles: File[] = [];
        const errors: string[] = [];

        Array.from(fileList).forEach(file => {
          // Check file size
          if (maxSize && file.size > maxSize) {
            errors.push(
              `File ${file.name} is too large (${formatFileSize(file.size)}). Maximum size is ${formatFileSize(maxSize)}.`
            );
            return;
          }

          // Check file type
          if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
            errors.push(
              `File ${file.name} type (${file.type}) is not allowed.`
            );
            return;
          }

          validFiles.push(file);
        });

        // Report errors to parent component
        if (errors.length > 0) {
          onError?.(errors);
        }

        if (multiple) {
          const newFiles = [...files, ...validFiles];
          onChange?.(newFiles);
        } else {
          onChange?.(validFiles.slice(0, 1));
        }
      },
      [files, multiple, onChange, onError, maxSize, acceptedTypes]
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
          handleFiles(fileList);
        }
      },
      [handleFiles]
    );

    const handleDragEnter = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
          setDragActive(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if (!disabled) {
          const fileList = event.dataTransfer.files;
          if (fileList) {
            handleFiles(fileList);
          }
        }
      },
      [disabled, handleFiles]
    );

    const handleClick = useCallback(() => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    }, [disabled, fileInputRef]);

    const removeFile = useCallback(
      (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onChange?.(newFiles);
      },
      [files, onChange]
    );

    return (
      <div className={`${styles.fileUploadWrapper} ${className}`}>
        <div
          className={styles.fileUploadArea({
            variant,
            dragActive,
            disabled,
          })}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className={styles.hiddenInput}
            multiple={multiple}
            accept={acceptedTypes.join(",")}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />

          <div className={styles.fileUploadIcon}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15L12 2M12 2L15 5M12 2L9 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.fileUploadText}>{text}</div>
          <div className={styles.fileUploadSubtext}>{subtext}</div>
        </div>

        {files.length > 0 && (
          <div className={styles.fileList}>
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={e => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
