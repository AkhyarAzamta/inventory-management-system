// types/navigation.ts
import React from "react";

// Tipe untuk elemen navigasi utama
export type NavigationItem = {
  segment: string;
  title: string;
  icon?: React.ReactNode;
  children?: NavigationItem[]; // Sub-elemen navigasi
};

// Tipe untuk elemen khusus seperti header atau divider
export type NavigationSubheaderItem = {
  kind: "header" | "divider";
  title?: string; // Header memiliki title, divider tidak
};

// Kombinasi elemen navigasi utama dan elemen khusus
export type Navigation = (NavigationItem | NavigationSubheaderItem)[];
