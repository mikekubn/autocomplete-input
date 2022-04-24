import {
  fireEvent, render, screen,
} from '@testing-library/react';
import React from 'react';
import AutocompleteInput, { defaultValue, ITextFieldItem } from '.';

describe('Autocomplete Input', () => {
  it('', () => {
    jest.useFakeTimers();

    render(<AutocompleteInput
      label="Test"
      placeholder="Write here"
      getDataSource={() => {
        const entryValues = mock;
        let matches: ITextFieldItem[] = [];
        matches = entryValues.filter((item: { id: number, value: string }) => {
          const regex = new RegExp(`${entryValues[0].value}`, 'gi');
          return item.value.match(regex);
        });
        return matches;
      }}
      filterValue={jest.fn()}
      value={defaultValue}
      exactMatch
      timeout={500}
      onChange={jest.fn()}
      onFilterValueChange={jest.fn()}
    />);

    fireEvent.change(screen.getByLabelText('Test'), { target: { value: 'test' } });
    expect(screen.getByTestId('text-field')).toBeVisible();
    expect(screen.getByTestId('text-field-item')).toBeVisible();
    expect(screen.getByTestId('text-field-item')).toHaveTextContent('test_1');
    fireEvent.click(screen.getByTestId('text-field-item'));
  });
});

const mock = [
  {
    id: 1,
    value: 'test_1',
  },
];
