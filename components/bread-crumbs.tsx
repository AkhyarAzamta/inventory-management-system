// AutoBreadcrumbs.tsx
"use client";

import React from "react";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import { NAVIGATION } from "@/utils/navigationConfig";
import { findSegment } from "@/utils/findSegment";

export default function AutoBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = React.useMemo(() => {
    if (!pathname) return [];
    const pathParts = pathname.split("/").filter((part) => part);
    return pathParts.map((part, index) => {
      const href = "/" + pathParts.slice(0, index + 1).join("/");
      const navItem = findSegment(part, NAVIGATION);
      return {
        label: navItem?.title || part,
        href,
        icon: navItem?.icon,
      };
    });
  }, [pathname]);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
        href="/"
        sx={{ display: "flex", alignItems: "center" }}
      >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />
        Home
      </Link>
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <Typography
          component="div"
            key={crumb.href}
            color="text.primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {crumb.icon && <Box sx={{ mr: 0.5 }}>{crumb.icon}</Box>}
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={crumb.href}
            underline="hover"
            color="inherit"
            href={crumb.href}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {crumb.icon && <Box sx={{ mr: 0.5 }}>{crumb.icon}</Box>}
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
