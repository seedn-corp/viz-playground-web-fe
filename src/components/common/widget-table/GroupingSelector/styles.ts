import { css } from '@emotion/react';

export const groupingSelectorCss = {
  container: css({
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    padding: '1rem',
  }),

  title: css({
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151',
  }),

  levelContainer: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }),

  levelSelectContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: 1,
  }),

  levels: [
    // 0단계(파랑)
    {
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe',
    },
    // 1단계(초록)
    {
      color: '#22c55e',
      bgColor: '#f0fdf4',
      borderColor: '#bbf7d0',
    },
    // 2단계(노랑)
    {
      color: '#eab308',
      bgColor: '#fefce8',
      borderColor: '#fef9c3',
    },
    // 3단계(보라)
    {
      color: '#a855f7',
      bgColor: '#f3e8ff',
      borderColor: '#e9d5ff',
    },
  ],

  levelBox: css({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
  }),

  label: css({
    fontSize: '0.875rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  }),

  select: css({
    flex: 1,
    padding: '0.25rem 0.75rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
  }),

  removeBtn: css({
    fontSize: '0.875rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),

  bottom: css({
    marginTop: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  }),

  clearBtn: css({
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    background: '#f3f4f6',
    color: '#374151',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      background: '#e5e7eb',
    },
  }),
};
