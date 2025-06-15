import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../styles/theme.css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
});

const label = style({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: vars.colors.foreground,
});

const input = recipe({
  base: {
    padding: '0.75rem',
    border: `1px solid ${vars.colors.border}`,
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    backgroundColor: vars.colors.background,
    color: vars.colors.foreground,

    ':focus': {
      borderColor: vars.colors.primary,
      boxShadow: `0 0 0 3px ${vars.colors.primary}20`,
    },

    '::placeholder': {
      color: vars.colors.mutedForeground,
    },
  },
  
  variants: {
    variant: {
      default: {},
      error: {
        borderColor: '#dc3545',
        ':focus': {
          borderColor: '#dc3545',
          boxShadow: `0 0 0 3px #dc354520`,
        },
      },
    },
  },
});

const error = style({
  fontSize: '0.875rem',
  color: '#dc3545',
  marginTop: '0.25rem',
});

export const inputStyles = {
  container,
  label,
  input,
  error,
};