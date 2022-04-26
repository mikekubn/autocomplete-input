import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { styled } from '@stitches/react';
import useSWR from 'swr';
import AutocompleteInput, { ITextFieldItem } from '../components/AutocompleteInput';
import { fetcher } from '../../utils/fetcher';

const Home: NextPage = (): React.ReactElement => {
  const [filterValueChange, setFilterValueChange] = React.useState<string>('');
  const [valueChange, setValueChange] = React.useState<ITextFieldItem>({ id: 0, value: '' });

  const { data } = useSWR('https://api.stg.behavera.com/v1/data_sources/preferences?lang=EN', fetcher);

  const getEntryValues = (values: { value: number, label: string }[]) => values?.map((item) => ({
    id: item.value,
    value: item.label,
  }));

  return (
    <>
      <Head>
        <title>Autocomplete Input</title>
        <meta name="description" content="Autocomplete Input" />
        <meta property="og:title" content="Autocomplete Input - Frontend developer" />
      </Head>
      <Wrapper>
        <AutocompleteInput
          label="Autocomplete Input"
          placeholder="Write here..."
          getDataSource={(val) => {
            const entryValues = getEntryValues(data?.payload?.industries);
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
    </>
  );
};

export default Home;

const Wrapper = styled('div', {
  width: '360px',
  height: '80px',
});

// const { data: users } = useSWR('https://reqres.in/api/users', fetcher);
// const getEntryValues = (values: { id: number, email: string }[]) => values?.map((item) => ({
//   id: item.id,
//   value: item.email,
// }));
