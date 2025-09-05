import { css } from '@emotion/react';

export const colorPickerCss = {
  colorButton: (color: string, isActive: boolean) => css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${color};
    border: 2px solid ${isActive ? color : '#e5e5e5'};
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
    position: relative;

    &:hover {
      transform: scale(1.1);
    }

    ${isActive &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        background-color: white;
        border-radius: 50%;
      }
    `}
  `,
};