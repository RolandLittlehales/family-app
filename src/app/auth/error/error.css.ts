import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

const container = style({
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: vars.colors.background,
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  textAlign: 'center',
});

const icon = style({
  fontSize: '3rem',
  marginBottom: '1rem',
});

const title = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: vars.colors.foreground,
  marginBottom: '1rem',
});

const message = style({
  fontSize: '1rem',
  color: vars.colors.mutedForeground,
  marginBottom: '2rem',
  lineHeight: 1.5,
});

const actions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const button = style({
  width: '100%',
});

export const errorStyles = {
  container,
  icon,
  title,
  message,
  actions,
  button,
};