import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

const container = style({
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: vars.colors.background,
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

const header = style({
  textAlign: 'center',
  marginBottom: '2rem',
});

const backButton = style({
  backgroundColor: 'transparent',
  border: 'none',
  color: vars.colors.primary,
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: '1rem',
  padding: '0.5rem',
  borderRadius: '0.25rem',
  transition: 'background-color 0.2s ease',
  
  ':hover': {
    backgroundColor: vars.colors.muted,
  },
});

const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: vars.colors.foreground,
  marginBottom: '0.5rem',
});

const subtitle = style({
  fontSize: '1rem',
  color: vars.colors.mutedForeground,
  lineHeight: 1.5,
});

const options = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const optionButton = style({
  padding: '1.5rem',
  border: `2px solid ${vars.colors.border}`,
  borderRadius: '0.75rem',
  backgroundColor: vars.colors.background,
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'all 0.2s ease',
  
  ':hover': {
    borderColor: vars.colors.primary,
    backgroundColor: vars.colors.muted,
  },
});

const optionIcon = style({
  fontSize: '2.5rem',
  marginBottom: '1rem',
});

const optionTitle = style({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: vars.colors.foreground,
  marginBottom: '0.5rem',
});

const optionDescription = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
  lineHeight: 1.4,
});

const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

const submitButton = style({
  width: '100%',
  padding: '0.75rem',
  marginTop: '0.5rem',
});

export const familySetupStyles = {
  container,
  header,
  backButton,
  title,
  subtitle,
  options,
  optionButton,
  optionIcon,
  optionTitle,
  optionDescription,
  form,
  submitButton,
};