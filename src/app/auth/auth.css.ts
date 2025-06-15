import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '2rem 1rem',
  backgroundColor: vars.colors.muted,
});

export const authPageStyles = {
  container,
};