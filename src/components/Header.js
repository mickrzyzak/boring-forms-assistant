import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Stack, Typography } from '@mui/material';
import { indigo, grey } from '@mui/material/colors';

function Header() {

  const breakpoint430px = useMediaQuery('(min-width:430px)');

  return (
    <Box sx={{
      mt: { xs: 2, sm: 5 },
      mb: { xs: 3, md: 0 }
    }}>
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: indigo[900],
          fontWeight: 500,
          textAlign: { xs: 'center', sm: 'left' },
          fontSize: { xs: '2.5rem', sm: '3rem' },
          mb: { xs: 1, sm: 1.5 }
        }}
      >
        Boring Forms
        {' '}
        <Typography
          variant="inherit"
          component="span"
          sx={{ color: indigo[500] }}
        >
          Assistant
        </Typography>
      </Typography>
      <Stack
        direction="row"
        spacing={breakpoint430px ? 5 : .5}
        sx={{ justifyContent: { xs: 'center', sm: 'start' } }}
      >
        {['Do less.', 'Create more.', 'Finish earlier.'].map(
          (el, id) => (
            <Typography
              variant="h6"
              component="div"
              key={id}
              sx={{ color: grey[900], textAlign: 'center' }}
            >
              {el}
            </Typography>
          )
        )}
      </Stack>
    </Box>
  );
}

export default Header;
