import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

const container = style({
  width: '100%',
  maxWidth: '400px',
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

const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: vars.colors.foreground,
  marginBottom: '0.5rem',
});

const subtitle = style({
  fontSize: '1rem',
  color: vars.colors.mutedForeground,
});

const error = style({
  padding: '0.75rem',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  border: `1px solid #dc3545`,
  borderRadius: '0.5rem',
  marginBottom: '1.5rem',
  fontSize: '0.875rem',
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

const footer = style({
  textAlign: 'center',
  marginTop: '2rem',
  paddingTop: '1.5rem',
  borderTop: `1px solid ${vars.colors.border}`,
});

const footerText = style({
  fontSize: '0.875rem',
  color: vars.colors.mutedForeground,
});

const link = style({
  color: vars.colors.primary,
  textDecoration: 'none',
  fontWeight: 500,
  
  ':hover': {
    textDecoration: 'underline',
  },
});

export const signInFormStyles = {
  container,
  header,
  title,
  subtitle,
  error,
  form,
  submitButton,
  footer,
  footerText,
  link,
};