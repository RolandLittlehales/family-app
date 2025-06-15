import { SignUpForm } from '@/components/auth/SignUpForm';
import { PageLayout } from '@/components/PageLayout';
import { authPageStyles } from '../auth.css';

export default function SignUpPage() {
  return (
    <PageLayout title="Sign Up">
      <div className={authPageStyles.container}>
        <SignUpForm />
      </div>
    </PageLayout>
  );
}

export const metadata = {
  title: 'Sign Up - Family App',
  description: 'Create your family app account',
};