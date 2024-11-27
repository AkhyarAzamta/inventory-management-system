"use client";

import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AutoBreadcrumbs from "@/components/bread-crumbs"; // Sesuaikan dengan path file Anda

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout sx={{ backgroundColor: "#dde4f0" }}>
      <PageContainer>
        <AutoBreadcrumbs />
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}
