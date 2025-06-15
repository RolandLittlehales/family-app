import { PageLayout } from '@/components/PageLayout';
import { FamilySetupForm } from '@/components/auth/FamilySetupForm';
import { authPageStyles } from '../auth.css';

export default function SetupPage() {
  return (
    <PageLayout title="Family Setup">
      <div className={authPageStyles.container}>
        <FamilySetupForm />
      </div>
    </PageLayout>
  );
}

export const metadata = {
  title: 'Family Setup - Family App',
  description: 'Set up your family account',
};