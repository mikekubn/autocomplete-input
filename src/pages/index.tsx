import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { styled } from '@stitches/react';
import useSWR from 'swr';
import AutocompleteInput, { defaultValue, ITextFieldItem } from '@/components/AutocompleteInput';
import { fetcher } from '@/utils/fetcher';

const Home: NextPage = (): React.ReactElement => {
  const [curentValue, setCurentValue] = React.useState<ITextFieldItem>(defaultValue);

  // const { data: users } = useSWR('https://reqres.in/api/users', fetcher);
  const { data } = useSWR('https://api.stg.behavera.com/v1/data_sources/preferences?lang=EN', fetcher);

  // const getEntryValues = (values: { id: number, email: string }[]) => values?.map((item) => ({
  //   id: item.id,
  //   value: item.email,
  // }));

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
          getDataSource={() => {
            const entryValues = getEntryValues(data?.payload?.industries);
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
    </>
  );
};

export default Home;

const Wrapper = styled('div', {
  width: '360px',
  height: '80px',
});
