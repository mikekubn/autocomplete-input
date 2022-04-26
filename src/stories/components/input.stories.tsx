import { styled } from '@stitches/react';
import React from 'react';
import AutocompleteInput, { ITextFieldItem } from '../../components/AutocompleteInput/index';

export default {
  title: 'Components/AutocompleteInput',
  component: AutocompleteInput,

};

const Wrapper = styled('div', {
  width: '360px',
  height: '80px',
});

const mock = [
  {
    id: 1,
    value: 'name_1',
  },
  {
    id: 2,
    value: 'name_2',
  },
  {
    id: 3,
    value: 'name_3',
  },
  {
    id: 4,
    value: 'name_4',
  },
  {
    id: 5,
    value: 'name_5',
  },
];

export const Default = (): React.ReactElement => {
  const [filterValueChange, setFilterValueChange] = React.useState<string>('');
  const [valueChange, setValueChange] = React.useState<ITextFieldItem>({ id: 0, value: '' });

  return (
    <Wrapper>
      <AutocompleteInput
        label="Autocomplete Input"
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
        onValueChange={(val) => setValueChange(val)}
        onFilterValueChange={(val) => setFilterValueChange(val)}
      />
    </Wrapper>
  );
};

export const Disabled = (): React.ReactElement => {
  const [filterValueChange, setFilterValueChange] = React.useState<string>('');
  const [valueChange, setValueChange] = React.useState<ITextFieldItem>({ id: 0, value: '' });

  return (
    <Wrapper>
      <AutocompleteInput
        label="Autocomplete Input"
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
        disabled
        onValueChange={(val) => setValueChange(val)}
        onFilterValueChange={(val) => setFilterValueChange(val)}
      />
    </Wrapper>
  );
};

export const ExactMatch = (): React.ReactElement => {
  const [filterValueChange, setFilterValueChange] = React.useState<string>('');
  const [valueChange, setValueChange] = React.useState<ITextFieldItem>({ id: 0, value: '' });

  return (
    <Wrapper>
      <AutocompleteInput
        label="Autocomplete Input"
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
    </Wrapper>
  );
};
