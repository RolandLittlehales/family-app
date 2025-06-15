'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '../forms/Input';
import { Button } from '../Button';
import { signInFormStyles } from './SignInForm.css';
import { SignInFormData } from '../../types/auth';
import { EmailSchema, PasswordSchema } from '../../lib/validation/schemas';

interface SignInFormProps {
  callbackUrl?: string;
  error?: string;
}

export function SignInForm({ callbackUrl = '/', error }: SignInFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<SignInFormData> = {};

    const emailValidation = EmailSchema.safeParse(formData.email);
    if (!emailValidation.success) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordValidation = PasswordSchema.safeParse(formData.password);
    if (!passwordValidation.success) {
      newErrors.password = 'Please enter your password';
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
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ password: 'Invalid email or password' });
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch {
      setErrors({ password: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignInFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={signInFormStyles.container}>
      <div className={signInFormStyles.header}>
        <h1 className={signInFormStyles.title}>Sign In</h1>
        <p className={signInFormStyles.subtitle}>
          Welcome back! Please sign in to your account.
        </p>
      </div>

      {error && (
        <div className={signInFormStyles.error} role="alert">
          {error === 'CredentialsSignin' 
            ? 'Invalid email or password' 
            : 'An error occurred during sign in'
          }
        </div>
      )}

      <form onSubmit={handleSubmit} className={signInFormStyles.form}>
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="current-password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className={signInFormStyles.submitButton}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className={signInFormStyles.footer}>
        <p className={signInFormStyles.footerText}>
          Don't have an account?{' '}
          <a href="/auth/signup" className={signInFormStyles.link}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}