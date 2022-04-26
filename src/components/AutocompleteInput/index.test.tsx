import {
  fireEvent, render, screen,
} from '@testing-library/react';
import React from 'react';
import AutocompleteInput, { ITextFieldItem } from '.';

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
  const [filterValueChange, setFilterValueChange] = React.useState<string>('');
  const [valueChange, setValueChange] = React.useState<ITextFieldItem>({ id: 0, value: '' });

  return (
    <AutocompleteInput
      label="Test"
      placeholder="Write here..."
      getDataSource={(val) => {
        const entryValues = mock;
        let matches: ITextFieldItem[] = [];
        if (val) {
          if (val?.length > 0) {
            matches = entryValues?.filter((item: { id: number, value: string }) => {
              const regex = new RegExp(`${val}`, 'gi');
              return item.value.match(regex);
            });
          }
        }
        return matches;
      }}
      filterValue={filterValueChange}
      value={valueChange}
      exactMatch
      timeout={1500}
      onValueChange={(val) => setValueChange(val)}
      onFilterValueChange={(val) => setFilterValueChange(val)}
    />
  );
};

const mock = [
  {
    id: 1,
    value: 'test_1',
  },
];
