'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../forms/Input';
import { Button } from '../Button';
import { signUpFormStyles } from './SignUpForm.css';
import { SignUpFormData } from '../../types/auth';
import { EmailSchema, PasswordSchema, UsernameSchema } from '../../lib/validation/schemas';
import { AuthHelpers } from '../../lib/auth-helpers';

export function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpFormData> = {};

    const nameValidation = UsernameSchema.safeParse(formData.name);
    if (!nameValidation.success) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    const emailValidation = EmailSchema.safeParse(formData.email);
    if (!emailValidation.success) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordValidation = PasswordSchema.safeParse(formData.password);
    if (!passwordValidation.success) {
      const strengthCheck = AuthHelpers.validatePasswordStrength(formData.password);
      newErrors.password = strengthCheck.errors[0] || 'Password is invalid';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.field) {
          setErrors({ [result.field]: result.message });
        } else {
          setErrors({ email: result.message || 'Registration failed' });
        }
        return;
      }

      // Redirect to setup page after successful registration
      router.push('/auth/setup');
    } catch {
      setErrors({ email: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignUpFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={signUpFormStyles.container}>
      <div className={signUpFormStyles.header}>
        <h1 className={signUpFormStyles.title}>Create Account</h1>
        <p className={signUpFormStyles.subtitle}>
          Join our family app and start organizing together.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={signUpFormStyles.form}>
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          autoComplete="name"
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          autoComplete="email"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="new-password"
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className={signUpFormStyles.submitButton}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className={signUpFormStyles.footer}>
        <p className={signUpFormStyles.footerText}>
          Already have an account?{' '}
          <a href="/auth/signin" className={signUpFormStyles.link}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}