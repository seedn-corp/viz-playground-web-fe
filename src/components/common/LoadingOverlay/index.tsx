import { Spinner } from '@basiln/design-system';

import { loadingOverlayCss } from './styles';

export function LoadingOverlay({ visible = false }: { visible?: boolean }) {
  if (!visible) {
    return null;
  }

  return (
    <div css={loadingOverlayCss.self} role="status" aria-live="polite">
      <Spinner color="seedn_key" />
    </div>
  );
}
