import { styled } from '@stitches/react';

const Flex = styled('div', {
  display: 'flex',
  variants: {
    wrap: {
      wrap: {
        flexWrap: 'wrap',
      },
      'no-wrap': {
        flexWrap: 'nowrap',
      },
      'wrap-reverse': {
        flexWrap: 'wrap-reverse',
      },
    },
    variants: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
    content: {
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      'space-between': {
        justifyContent: 'space-between',
      },
    },
    items: {
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
      center: {
        alignItems: 'center',
      },
    },
    space: {
      none: {
        gap: 0,
      },
      sm: {
        gap: '5px',
      },
      md: {
        gap: '10px',
      },
      lg: {
        gap: '20px',
      },
    },
  },
});

export { Flex };
