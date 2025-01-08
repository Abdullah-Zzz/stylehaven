import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' , margin:"50px 0px"}}>
      <CircularProgress color="secondary"/>
    </Box>
  );
}