import { useEffect, useRef, useState } from 'react';
import type { WidgetChartProps } from './types';
import WidgetChart from './index';

const LazyWidgetChart = (props: WidgetChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;

        // 최소 크기가 확보되면 차트 렌더링
        if (width > 50 && height > 50) {
          // 약간의 지연을 두어 레이아웃이 안정된 후 렌더링
          setTimeout(() => {
            setShouldRender(true);
          }, 100);
        }
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      css={{
        width: '100%',
        height: '100%',
        minHeight: 200,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {shouldRender ? (
        <div css={{ width: '100%', height: '100%' }}>
          <WidgetChart {...props} />
        </div>
      ) : (
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            fontSize: 14,
            height: '100%',
            opacity: 0.6,
          }}
        >
          차트 로딩 중...
        </div>
      )}
    </div>
  );
};

export default LazyWidgetChart;
