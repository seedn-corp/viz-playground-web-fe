import { hexToRgba } from '@basiln/utils';
import { useTheme } from '@emotion/react';
import { ToastBar, Toaster } from 'react-hot-toast';

const CustomToaster = () => {
  const theme = useTheme();
  return (
    <Toaster
      position="top-center"
      containerStyle={{ top: 42 }}
      toastOptions={{
        duration: 2000,
        style: {
          backgroundColor: hexToRgba({ hex: '#424956', alpha: 0.8 }),
          color: theme.colors.white,
          minWidth: 362,
          maxWidth: 500,
          minHeight: 46,
          boxShadow: 'none',
          fontSize: 14,
          letterSpacing: 0,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              <span
                css={{
                  '*': {
                    color: theme.colors.white,
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0,
                  },
                }}
              >
                {message}
              </span>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomToaster;
