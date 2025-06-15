import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/Button';
import { authPageStyles } from '../auth.css';
import { errorStyles } from './error.css';

interface AuthErrorPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

function getErrorMessage(error?: string): string {
  switch (error) {
    case 'Configuration':
      return 'There is a problem with the server configuration.';
    case 'AccessDenied':
      return 'You do not have permission to sign in.';
    case 'Verification':
      return 'The verification token has expired or has already been used.';
    case 'Default':
    default:
      return 'An error occurred during authentication.';
  }
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;
  const errorMessage = getErrorMessage(error);

  return (
    <PageLayout title="Authentication Error">
      <div className={authPageStyles.container}>
        <div className={errorStyles.container}>
          <div className={errorStyles.icon}>⚠️</div>
          <h1 className={errorStyles.title}>Authentication Error</h1>
          <p className={errorStyles.message}>{errorMessage}</p>
          <div className={errorStyles.actions}>
            <Button 
              onClick={() => window.location.href = '/auth/signin'}
              className={errorStyles.button}
            >
              Back to Sign In
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className={errorStyles.button}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export const metadata = {
  title: 'Authentication Error - Family App',
  description: 'An error occurred during authentication',
};