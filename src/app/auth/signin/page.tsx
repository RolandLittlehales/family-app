import { Suspense } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import { PageLayout } from '@/components/PageLayout';
import { authPageStyles } from '../auth.css';

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl, error } = await searchParams;
  
  return (
    <PageLayout title="Sign In">
      <div className={authPageStyles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm 
            callbackUrl={callbackUrl}
            error={error}
          />
        </Suspense>
      </div>
    </PageLayout>
  );
}

export const metadata = {
  title: 'Sign In - Family App',
  description: 'Sign in to your family app account',
};