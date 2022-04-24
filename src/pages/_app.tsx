import React from 'react';
import type { AppProps } from 'next/app';
import CenterLayout from '@/layouts/CenterLayout';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <CenterLayout>
    <Component {...pageProps} />
  </CenterLayout>
);

export default MyApp;
