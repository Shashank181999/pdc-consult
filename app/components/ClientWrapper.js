'use client';

import React from 'react';
import PageLoader from './PageLoader';

const ClientWrapper = ({ children }) => {
  return (
    <PageLoader>
      {children}
    </PageLoader>
  );
};

export default ClientWrapper;
