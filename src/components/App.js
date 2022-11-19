import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';

const theme = createTheme({
  palette: {
    indigo: {
      main: '#3f51b5'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Header />
        <Form />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
