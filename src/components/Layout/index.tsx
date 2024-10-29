import { Container } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <Container size={'lg'}>{children}</Container>;
};

export default Layout;
