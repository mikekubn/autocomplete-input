import {
  fireEvent, render, screen,
} from '@testing-library/react';
import React from 'react';
import AutocompleteInput, { defaultValue, ITextFieldItem } from '.';

describe('Autocomplete Input', () => {
  it('render autocomplete input', () => {
    jest.useFakeTimers();

    render(<Component />);

    fireEvent.change(screen.getByLabelText('Test'), { target: { value: 'test' } });
    expect(screen.getByLabelText('text-input')).toHaveValue('test');
    expect(screen.getByTestId('text-field')).toBeVisible();
    expect(screen.getByTestId('text-field-item')).toBeVisible();
    expect(screen.getByTestId('text-field-item')).toHaveTextContent('test_1');

    fireEvent.click(screen.getByTestId('text-field-item'));
    expect(screen.getByLabelText('text-input')).toHaveValue('test_1');
  });
});

const Component = () => {
  const [currentValue, setCurentValue] = React.useState(defaultValue);

  return (
    <AutocompleteInput
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
      filterValue={(val) => setCurentValue(val)}
      value={currentValue}
      exactMatch
      timeout={500}
      onChange={jest.fn()}
      onFilterValueChange={jest.fn()}
    />
  );
};

const mock = [
  {
    id: 1,
    value: 'test_1',
  },
];
