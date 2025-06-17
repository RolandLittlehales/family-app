import { useState, useCallback } from "react";

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
};

export type FieldValidation = {
  [fieldName: string]: ValidationRule;
};

export type FormErrors = {
  [fieldName: string]: string | undefined;
};

export type FormValues = {
  [fieldName: string]: unknown;
};

export interface UseFormValidationReturn {
  values: FormValues;
  errors: FormErrors;
  isValid: boolean;
  setValue: (name: string, value: unknown) => void;
  setError: (name: string, error: string | undefined) => void;
  validate: (name?: string) => boolean;
  validateAll: () => boolean;
  reset: (initialValues?: FormValues) => void;
  handleSubmit: (
    onSubmit: (values: FormValues) => void
  ) => (event: React.FormEvent) => void;
}

export function useFormValidation(
  initialValues: FormValues = {},
  validationRules: FieldValidation = {}
): UseFormValidationReturn {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (name: string, value: unknown): string | undefined => {
      const rules = validationRules[name];
      if (!rules) return undefined;

      // Required validation
      if (
        rules.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
      ) {
        return "This field is required";
      }

      // Skip other validations if field is empty and not required
      if (!value && !rules.required) return undefined;

      // String-specific validations
      if (typeof value === "string") {
        if (rules.minLength && value.length < rules.minLength) {
          return `Must be at least ${rules.minLength} characters`;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
          return `Must be no more than ${rules.maxLength} characters`;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
          return "Invalid format";
        }
      }

      // Custom validation
      if (rules.custom) {
        return rules.custom(value);
      }

      return undefined;
    },
    [validationRules]
  );

  const setValue = useCallback(
    (name: string, value: unknown) => {
      setValues(prev => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const setError = useCallback((name: string, error: string | undefined) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const validate = useCallback(
    (name?: string): boolean => {
      if (name) {
        const error = validateField(name, values[name]);
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
      }

      return false;
    },
    [validateField, values]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isFormValid = true;

    // Validate all fields that have rules
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      newErrors[name] = error;
      if (error) {
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    return isFormValid;
  }, [validateField, values, validationRules]);

  const reset = useCallback(
    (newInitialValues?: FormValues) => {
      const resetValues = newInitialValues || initialValues;
      setValues(resetValues);
      setErrors({});
    },
    [initialValues]
  );

  const handleSubmit = useCallback(
    (onSubmit: (values: FormValues) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      if (validateAll()) {
        onSubmit(values);
      }
    },
    [validateAll, values]
  );

  // Calculate if form is valid
  const isValid = Object.keys(validationRules).every(
    name => !errors[name] && values[name] !== undefined
  );

  return {
    values,
    errors,
    isValid,
    setValue,
    setError,
    validate,
    validateAll,
    reset,
    handleSubmit,
  };
}

// Common validation patterns
export const validationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[\d\s\-()]+$/,
  url: /^https?:\/\/.+\..+/i,
  number: /^\d+$/,
  decimal: /^\d+(\.\d+)?$/,
};

// Common validation rules
export const commonValidations = {
  email: {
    required: true,
    pattern: validationPatterns.email,
  },
  password: {
    required: true,
    minLength: 8,
  },
  phone: {
    pattern: validationPatterns.phone,
  },
  url: {
    pattern: validationPatterns.url,
  },
};
