import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import * as styles from "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size" | "onChange"
  > {
  /** Size variant of the select */
  size?: "small" | "medium" | "large";
  /** Visual variant of the select */
  variant?: "default" | "error" | "success";
  /** Whether the select should take full width */
  fullWidth?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Array of options */
  options: SelectOption[];
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = "",
      size = "medium",
      variant = "default",
      fullWidth = true,
      placeholder = "Select an option...",
      options = [],
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLSelectElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Find the selected option
    const selectedOption = options.find(option => option.value === value);

    // Handle clicking outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Handle escape key to close dropdown
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          setFocusedIndex(-1);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }, [isOpen]);

    const handleToggle = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setFocusedIndex(-1);
      }
    }, [disabled, isOpen]);

    const handleOptionSelect = useCallback(
      (optionValue: string) => {
        onChange?.(optionValue);
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      },
      [onChange]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const enabledOptions = options.filter(option => !option.disabled);

        switch (event.key) {
          case "Enter":
          case " ":
            event.preventDefault();
            if (isOpen && focusedIndex >= 0) {
              const focusedOption = enabledOptions[focusedIndex];
              if (focusedOption) {
                handleOptionSelect(focusedOption.value);
              }
            } else {
              handleToggle();
            }
            break;

          case "ArrowDown":
            event.preventDefault();
            if (!isOpen) {
              handleToggle();
            } else {
              setFocusedIndex(prev =>
                prev < enabledOptions.length - 1 ? prev + 1 : 0
              );
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            if (!isOpen) {
              handleToggle();
            } else {
              setFocusedIndex(prev =>
                prev > 0 ? prev - 1 : enabledOptions.length - 1
              );
            }
            break;

          case "Home":
            if (isOpen) {
              event.preventDefault();
              setFocusedIndex(0);
            }
            break;

          case "End":
            if (isOpen) {
              event.preventDefault();
              setFocusedIndex(enabledOptions.length - 1);
            }
            break;
        }
      },
      [isOpen, focusedIndex, options, handleToggle, handleOptionSelect]
    );

    return (
      <div className={`${styles.selectWrapper} ${className}`}>
        {/* Hidden native select for form submission */}
        <select
          ref={ref || selectRef}
          value={value || ""}
          onChange={e => onChange?.(e.target.value)}
          className={styles.hiddenSelect}
          disabled={disabled}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom select trigger */}
        <div
          ref={triggerRef}
          className={styles.selectTrigger({
            size,
            variant,
            fullWidth,
            open: isOpen,
          })}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="select-dropdown"
          aria-disabled={disabled}
        >
          <span
            className={`${styles.selectValue} ${
              !selectedOption ? styles.selectPlaceholder : ""
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <svg
            className={`${styles.selectIcon} ${
              isOpen ? styles.selectIconOpen : ""
            }`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Dropdown */}
        <div
          ref={dropdownRef}
          id="select-dropdown"
          className={`${styles.selectDropdown} ${
            isOpen ? styles.selectDropdownOpen : ""
          }`}
          role="listbox"
        >
          {options.map(option => {
            const enabledOptions = options.filter(opt => !opt.disabled);
            const focusedOptionIndex = enabledOptions.findIndex(
              opt => opt === option
            );
            const isFocused = focusedOptionIndex === focusedIndex;

            return (
              <button
                key={option.value}
                type="button"
                className={styles.selectOption({
                  selected: option.value === value,
                  size,
                })}
                onClick={() => handleOptionSelect(option.value)}
                disabled={option.disabled}
                role="option"
                aria-selected={option.value === value}
                data-focused={isFocused}
                style={{
                  backgroundColor:
                    isFocused && !option.disabled
                      ? "var(--colors-muted)"
                      : undefined,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
