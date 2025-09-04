import { Text } from '@basiln/design-system';
import { Flex } from '@basiln/utils';
import { Fragment } from 'react';

import type { BreadcrumbProps } from './types';

export const Breadcrumb = ({ items, pageTitle }: BreadcrumbProps) => {
  return (
    <Flex direction="column" justify="center" align="start">
      <Flex align="center" gap={8}>
        {items.map((it, idx) => (
          <Fragment key={`${it.label}-${idx}`}>
            {it.href ? (
              <a href={it.href}>
                <Text size="caption-regular" color="gray_080">
                  {it.label}
                </Text>
              </a>
            ) : (
              <Text size="caption-regular" color="gray_080">
                {it.label}
              </Text>
            )}

            {idx < items.length - 1 && (
              <Text size="caption-regular" color="gray_060">
                /
              </Text>
            )}
          </Fragment>
        ))}
      </Flex>

      {pageTitle && <Text size="body-large">{pageTitle}</Text>}
    </Flex>
  );
};
