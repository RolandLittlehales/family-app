'use client';

import React, { forwardRef } from 'react';
import { inputStyles } from './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'error';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = 'default', className, ...props }, ref) => {
    const finalVariant = error ? 'error' : variant;

    return (
      <div className={inputStyles.container}>
        {label && (
          <label htmlFor={props.id} className={inputStyles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${inputStyles.input({ variant: finalVariant })} ${className || ''}`}
          {...props}
        />
        {error && (
          <span className={inputStyles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';