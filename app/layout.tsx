import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import StoreIcon from '@mui/icons-material/Store';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'inventory',
    title: 'Inventory',
    icon: <InventoryIcon />,
    children: [
      {
        segment: 'inbound',
        title: 'Inbound',
        icon: <ArchiveIcon />,
      },
      {
        segment: 'outbound',
        title: 'Outbound',
        icon: <UnarchiveIcon />,
      },
    ],
  },
  {
    segment: 'suppliers',
    title: 'Suppliers',
    icon: <StoreIcon />,
  },
];
const BRANDING = {
  title: 'PT. AARTI JAYA VELVET INDUSTRI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <body>
          <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            {children}
          </AppProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}

