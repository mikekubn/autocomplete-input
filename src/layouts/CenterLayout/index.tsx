import { styled } from '@stitches/react';
import React from 'react';

interface IProps {
  children: React.ReactNode,
}

const CenterLayout = ({ children }: IProps): React.ReactElement => (
  <Main>
    {children}
  </Main>
);

const Main = styled('main', {
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export default CenterLayout;
