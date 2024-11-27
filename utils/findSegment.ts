// findSegment.ts
import { Navigation, NavigationItem } from "@/types/navigation";

export function findSegment(
  segment: string,
  nav: Navigation
): NavigationItem | null {
  for (const item of nav) {
    if ("segment" in item && item.segment === segment) {
      return item; // Temukan item dengan segment yang sesuai
    }
    if ("children" in item && item.children) {
      const child = findSegment(segment, item.children); // Rekursi pada children
      if (child) return child;
    }
  }
  return null; // Kembalikan null jika tidak ditemukan
}
