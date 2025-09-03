import { css } from '@emotion/react';

export const groupingSelectorCss = {
  container: css({}),

  levelContainer: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  }),

  levelSelectContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
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
    padding: '6px 10px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  }),

  label: css({
    whiteSpace: 'nowrap',
  }),

  select: css({
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '12px',
    outline: 'none',
    transition: 'all 0.2s',
  }),

  bottom: css({
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  }),
};
