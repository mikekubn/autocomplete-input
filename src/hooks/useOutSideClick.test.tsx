import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOutsideClick from './useOutSideClick';

describe('useOutsideClick', () => {
  it.each([
    ['does not trigger when element is closed', false, 0],
  ])('%s', (_name, open, calledTimes) => {
    const callback = jest.fn();
    const Component = () => {
      const ref = useOutsideClick<HTMLDivElement>(open, callback);

      return (
        <div data-testid="outside">
          <div ref={ref} />
          ;
        </div>
      );
    };

    render(<Component />);
    userEvent.click(screen.getByTestId('outside'));
    expect(callback).toHaveBeenCalledTimes(calledTimes);
  });
});
