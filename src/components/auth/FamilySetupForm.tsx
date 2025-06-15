'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../forms/Input';
import { Button } from '../Button';
import { familySetupStyles } from './FamilySetupForm.css';
import { FamilySetupFormData } from '../../types/auth';

export function FamilySetupForm() {
  const router = useRouter();
  const [setupType, setSetupType] = useState<'create' | 'join' | null>(null);
  const [formData, setFormData] = useState<FamilySetupFormData>({
    familyName: '',
    inviteCode: '',
  });
  const [errors, setErrors] = useState<Partial<FamilySetupFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FamilySetupFormData> = {};

    if (setupType === 'create') {
      if (!formData.familyName.trim()) {
        newErrors.familyName = 'Family name is required';
      } else if (formData.familyName.length < 2) {
        newErrors.familyName = 'Family name must be at least 2 characters';
      }
    } else if (setupType === 'join') {
      if (!formData.inviteCode?.trim()) {
        newErrors.inviteCode = 'Invite code is required';
      }
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
      const endpoint = setupType === 'create' ? '/api/family/create' : '/api/family/join';
      const payload = setupType === 'create' 
        ? { familyName: formData.familyName }
        : { inviteCode: formData.inviteCode };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        const field = setupType === 'create' ? 'familyName' : 'inviteCode';
        setErrors({ [field]: result.message || 'An error occurred' });
        return;
      }

      // Redirect to home page after successful setup
      router.push('/');
    } catch {
      const field = setupType === 'create' ? 'familyName' : 'inviteCode';
      setErrors({ [field]: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FamilySetupFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!setupType) {
    return (
      <div className={familySetupStyles.container}>
        <div className={familySetupStyles.header}>
          <h1 className={familySetupStyles.title}>Welcome to Family App!</h1>
          <p className={familySetupStyles.subtitle}>
            Let's set up your family account. You can either create a new family or join an existing one.
          </p>
        </div>

        <div className={familySetupStyles.options}>
          <button
            onClick={() => setSetupType('create')}
            className={familySetupStyles.optionButton}
          >
            <div className={familySetupStyles.optionIcon}>🏠</div>
            <h3 className={familySetupStyles.optionTitle}>Create New Family</h3>
            <p className={familySetupStyles.optionDescription}>
              Start fresh with a new family account and invite others to join.
            </p>
          </button>

          <button
            onClick={() => setSetupType('join')}
            className={familySetupStyles.optionButton}
          >
            <div className={familySetupStyles.optionIcon}>👥</div>
            <h3 className={familySetupStyles.optionTitle}>Join Existing Family</h3>
            <p className={familySetupStyles.optionDescription}>
              Use an invite code to join a family that's already set up.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={familySetupStyles.container}>
      <div className={familySetupStyles.header}>
        <button
          onClick={() => setSetupType(null)}
          className={familySetupStyles.backButton}
        >
          ← Back
        </button>
        <h1 className={familySetupStyles.title}>
          {setupType === 'create' ? 'Create Your Family' : 'Join a Family'}
        </h1>
        <p className={familySetupStyles.subtitle}>
          {setupType === 'create' 
            ? 'Choose a name for your family account.'
            : 'Enter the invite code you received.'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className={familySetupStyles.form}>
        {setupType === 'create' ? (
          <Input
            id="familyName"
            name="familyName"
            type="text"
            label="Family Name"
            placeholder="Enter your family name"
            value={formData.familyName}
            onChange={handleChange}
            error={errors.familyName}
            required
          />
        ) : (
          <Input
            id="inviteCode"
            name="inviteCode"
            type="text"
            label="Invite Code"
            placeholder="Enter the invite code"
            value={formData.inviteCode || ''}
            onChange={handleChange}
            error={errors.inviteCode}
            required
          />
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className={familySetupStyles.submitButton}
        >
          {isLoading 
            ? (setupType === 'create' ? 'Creating Family...' : 'Joining Family...')
            : (setupType === 'create' ? 'Create Family' : 'Join Family')
          }
        </Button>
      </form>
    </div>
  );
}