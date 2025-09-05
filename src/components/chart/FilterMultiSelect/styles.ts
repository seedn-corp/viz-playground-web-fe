import { css, type Theme } from '@emotion/react';

export const filterMultiSelectCss = {
  content: css({
    width: 250,
    minHeight: 300,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  }),

  searchContainer: (theme: Theme) =>
    css({
      padding: '8px 8px',
      borderBottom: `1px solid ${theme.colors.gray_050}`,
    }),

  searchInputWrapper: (theme: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 34,
      padding: '6px 8px',
      border: `1px solid ${theme.colors.gray_050}`,
      borderRadius: 4,
      '&:focus-within': {
        borderColor: theme.colors.seedn_key,
      },
    }),

  searchInput: (theme: Theme) =>
    css({
      border: 'none',
      outline: 'none',
      flex: 1,
      fontSize: 12,
      '&::placeholder': {
        color: theme.colors.gray_060,
      },
    }),

  clearButton: css({
    padding: 2,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }),

  actionsContainer: (theme: Theme) =>
    css({
      padding: '8px 8px',
      borderBottom: `1px solid ${theme.colors.gray_050}`,
      display: 'flex',
      gap: 8,
    }),

  selectAllButton: ({ theme, disabled }: { theme: Theme; disabled: boolean }) =>
    css({
      flex: 1,
      padding: '4px 8px',
      border: `1px solid ${theme.colors.seedn_key}`,
      borderRadius: 3,
      backgroundColor: 'white',
      color: theme.colors.seedn_key,
      fontSize: 11,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      '&:hover': !disabled
        ? {
            backgroundColor: theme.colors.seedn_key,
            color: 'white',
          }
        : {},
    }),

  clearAllButton: ({ theme, disabled }: { theme: Theme; disabled: boolean }) =>
    css({
      flex: 1,
      padding: '4px 8px',
      border: `1px solid ${theme.colors.gray_080}`,
      borderRadius: 3,
      backgroundColor: 'white',
      color: theme.colors.gray_080,
      fontSize: 11,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      '&:hover': !disabled
        ? {
            backgroundColor: theme.colors.gray_080,
            color: 'white',
          }
        : {},
    }),

  itemsContainer: css({
    flex: 1,
    overflowY: 'auto',
    maxHeight: 180,
  }),

  emptyState: (theme: Theme) =>
    css({
      padding: '16px 8px',
      textAlign: 'center',
      color: theme.colors.gray_060,
      fontSize: 12,
    }),

  item: ({ theme, isChecked }: { theme: Theme; isChecked: boolean }) =>
    css({
      width: '100%',
      justifyContent: 'space-between',
      color: isChecked ? theme.colors.seedn_key : theme.colors.black,
      padding: '8px 14px',
      fontSize: 12,
      '&:hover': {
        backgroundColor: theme.colors.gray_020,
      },
    }),

  itemText: css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 8,
  }),

  itemIcon: css({
    flexShrink: 0,
  }),

  counter: (theme: Theme) =>
    css({
      padding: '8px 8px',
      borderTop: `1px solid ${theme.colors.gray_050}`,
      backgroundColor: theme.colors.gray_020,
      fontSize: 11,
      color: theme.colors.gray_080,
      textAlign: 'center',
    }),
};
