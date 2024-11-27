import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout sx={{ backgroundColor: '#dde4f0'}}>
      <PageContainer>{props.children}</PageContainer>
    </DashboardLayout>
  );
}
