import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRow } from '../features/form/formSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  useTheme
} from '@mui/material';
import { FormTabs } from './CustomMuiComponents';
import SaveData from './SaveData';
import ExportImport from './ExportImport';
import Rows from './form/Rows';
import Bootstrap5Code from './code/Bootstrap5Code';
import Bootstrap5Preview from './preview/Bootstrap5Preview';

function Editor() {

  const dispatch = useDispatch();
  const breakpoint600px = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Rows />
      <Box sx={{ textAlign: 'center' }}>
        <ButtonGroup
          variant="outlined"
          color="indigo"
          size="large"
          orientation={breakpoint600px ? 'horizontal' : 'vertical'}
          fullWidth={true}
        >
          <Button onClick={() => dispatch(addRow(1))}>One column</Button>
          <Button onClick={() => dispatch(addRow(2))}>Two columns</Button>
          <Button onClick={() => dispatch(addRow(3))}>Three columns</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

function Preview() {
  return (
    <Bootstrap5Preview />
  );
}

function Code() {
  return (
    <Bootstrap5Code />
  );
}

function OutputFramework() {
  return (
    <FormControl
      size="small"
      disabled={true}
    >
      <InputLabel id="output-framework">
        Output framework
      </InputLabel>
      <Select
        labelId="output-framework"
        label="Output framework"
        color="indigo"
        value="bootstrap-5"
      >
        <MenuItem value="bootstrap-5">
          Bootstrap 5
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function Form() {

  const theme = useTheme();
  const [tab, setTab] = useState(0);

  function Navbar() {
    return (
      <FormTabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        TabIndicatorProps={{
          style: { background: theme.palette.indigo.main }
        }}
        sx={{
          mb: 2,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Tab label="Editor" />
        <Tab label="Preview" />
        <Tab label="Code" />
      </FormTabs>
    );
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <SaveData />
        <ExportImport />
        <OutputFramework />
      </Stack>
      <Box sx={{
        px: 3,
        pt: 2,
        pb: 3,
        bgcolor: 'white',
        borderRadius: 1,
        boxShadow: 1
      }}>
        <Navbar />
        {tab === 0 && <Editor />}
        {tab === 1 && <Preview />}
        {tab === 2 && <Code />}
      </Box>
    </>
  );
}

export default Form;
