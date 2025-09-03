import { theme } from '@basiln/design-system';
import { css } from '@emotion/react';

export const widgetTablePageHeaderCss = {
  self: css({
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px',
    backgroundColor: 'white',
    borderBottom: '1px solid  #0000001a',
  }),

  buttonContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  }),
};

export const widgetTableCss = {
  container: css({
    height: 'calc(100vh - 60px)',
  }),

  fieldTitle: css({
    marginBottom: '6px',
  }),

  left: css({
    borderRight: '1px solid #0000001a',
    padding: '20px',
  }),

  tableNameContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),

  tableNameInput: css({
    backgroundColor: theme.colors.gray_040,
    border: 'none',
    fontSize: '12px',
    padding: '6px 10px',
    borderRadius: '6px',
  }),

  separator: css({
    height: '1px',
    width: '100%',
    backgroundColor: '#0000001a',
  }),

  right: css({
    padding: '20px',
  }),

  previewContainer: css({
    border: '1px solid #0000001a',
    borderRadius: '6px',
    padding: '20px',
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
  }),
};
