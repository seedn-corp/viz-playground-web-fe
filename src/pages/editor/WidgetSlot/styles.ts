import { css } from '@emotion/react';

export const styles = {
  emptyState: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '140px',
    textAlign: 'center',
    gap: '20px',
    padding: '32px',
  }),
  iconContainer: css({
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
    border: '2px solid rgba(99, 102, 241, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginBottom: '8px',
  }),
  title: css({
    fontSize: '17px',
    fontWeight: 600,
    color: '#374151',
    letterSpacing: '-0.025em',
  }),
  badge: css({
    fontSize: '12px',
    color: '#6b7280',
    background:
      'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.12)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontWeight: 500,
  }),
};