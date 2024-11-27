import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2';

import React from 'react'

export default function layout(props: { children: React.ReactNode }) {
  return (
      <Box >
      {props.children}
      </Box>
  )
}
