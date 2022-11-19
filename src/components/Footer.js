import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { indigo, grey } from '@mui/material/colors';

function Footer() {
  return (
    <Box sx={{ mt: 'auto' }}>
      <Typography
        variant="body1"
        component="div"
        sx={{
          textAlign: 'center',
          color: grey[900],
          my: 2
        }}
      >
        Application created by
        {' '}
        <Link
          href="https://github.com/mickrzyzak"
          underline="none"
          target="_blank"
          sx={{ color: indigo[500] }}
        >
          mickrzyzak
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
