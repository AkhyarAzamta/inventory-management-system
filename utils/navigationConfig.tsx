// navigationConfig.ts
import { Navigation } from "@/types/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import StoreIcon from "@mui/icons-material/Store";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon/>,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "inventory",
    title: "Inventory",
    icon: <InventoryIcon />,
    children: [
      {
        segment: "inbound",
        title: "Inbound",
        icon: <ArchiveIcon />,
      },
      {
        segment: "outbound",
        title: "Outbound",
        icon: <UnarchiveIcon />,
      },
    ],
  },
  {
    segment: "suppliers",
    title: "Suppliers",
    icon: <StoreIcon />,
  },
];
