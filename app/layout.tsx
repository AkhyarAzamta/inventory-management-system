'use client';
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
import { usePathname } from 'next/navigation';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export const NAVIGATION: Navigation = [
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

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProtected = pathname === '/:path*'; // Tentukan apakah halaman harus dilindungi
  const { data: session, status } = useSession({
    required: isProtected, // Hanya wajib login jika halaman dilindungi
    onUnauthenticated() {
      if (isProtected) {
        signIn(); // Redirect ke signIn hanya untuk halaman terlindungi
      }
    },
  });

  // if (isProtected && status === 'loading') {
  //   return <Loading />; // Tampilkan loading jika sedang memeriksa sesi di halaman terlindungi
  // }

  return <>{children}</>;
}

function AppContent(props: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
// console.log(session);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => signIn(),
      signOut: () => signOut(),
    };
  }, []);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AppProvider
        branding={BRANDING}
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        // theme={theme}
      >
        <ProtectedContent>{props.children}</ProtectedContent>
      </AppProvider>
    </AppRouterCacheProvider>
  );
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <AppContent>{props.children}</AppContent>
        </SessionProvider>
      </body>
    </html>
  );
}

