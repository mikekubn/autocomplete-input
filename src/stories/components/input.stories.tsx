import { styled } from '@stitches/react';
import React from 'react';
import AutocompleteInput, { defaultValue, ITextFieldItem } from '../../components/AutocompleteInput/index';

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
  const [curentValue, setCurentValue] = React.useState<ITextFieldItem>(defaultValue);

  return (
    <Wrapper>
      <AutocompleteInput
        label="Autocomplete Input"
        placeholder="Write here..."
        getDataSource={() => {
          const entryValues = mock;
          let matches: ITextFieldItem[] = [];
          if (curentValue) {
            if (curentValue?.value?.length > 0) {
              matches = entryValues.filter((item: { id: number, value: string }) => {
                const regex = new RegExp(`${curentValue.value}`, 'gi');
                return item.value.match(regex);
              });
            }
          }
          return matches;
        }}
        filterValue={(val) => setCurentValue(val)}
        value={curentValue}
        onChange={(val) => console.log('onChange', val)}
        onFilterValueChange={(val) => console.log('onFilterValueChange', val)}
      />
    </Wrapper>
  );
};

export const Disabled = (): React.ReactElement => {
  const [curentValue, setCurentValue] = React.useState<ITextFieldItem>(defaultValue);

  return (
    <Wrapper>
      <AutocompleteInput
        label="Autocomplete Input"
        placeholder="Write here..."
        getDataSource={() => {
          const entryValues = mock;
          let matches: ITextFieldItem[] = [];
          if (curentValue) {
            if (curentValue?.value?.length > 0) {
              matches = entryValues.filter((item: { id: number, value: string }) => {
                const regex = new RegExp(`${curentValue.value}`, 'gi');
                return item.value.match(regex);
              });
            }
          }
          return matches;
        }}
        filterValue={(val) => setCurentValue(val)}
        value={curentValue}
        disabled
        onChange={(val) => console.log('onChange', val)}
        onFilterValueChange={(val) => console.log('onFilterValueChange', val)}
      />
    </Wrapper>
  );
};

export const ExactMatch = (): React.ReactElement => {
  const [curentValue, setCurentValue] = React.useState<ITextFieldItem>(defaultValue);

  return (
    <Wrapper>
      <AutocompleteInput
        label="Autocomplete Input"
        placeholder="Write here..."
        getDataSource={() => {
          const entryValues = mock;
          let matches: ITextFieldItem[] = [];
          if (curentValue) {
            if (curentValue?.value?.length > 0) {
              matches = entryValues.filter((item: { id: number, value: string }) => {
                const regex = new RegExp(`${curentValue.value}`, 'gi');
                return item.value.match(regex);
              });
            }
          }
          return matches;
        }}
        filterValue={(val) => setCurentValue(val)}
        value={curentValue}
        exactMatch
        timeout={1500}
        onChange={(val) => console.log('onChange', val)}
        onFilterValueChange={(val) => console.log('onFilterValueChange', val)}
      />
    </Wrapper>
  );
};
