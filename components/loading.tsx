import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}
