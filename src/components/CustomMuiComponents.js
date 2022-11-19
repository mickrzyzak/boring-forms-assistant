import { styled } from '@mui/material/styles';
import { AccordionSummary, Box, Menu, MenuItem, Paper, Tabs } from '@mui/material';

const MenuItemIndigo = styled(MenuItem)(({theme}) => ({
  '&.Mui-selected': {
    backgroundColor: 'rgba(63, 81, 181, 0.08)'
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'rgba(63, 81, 181, 0.12)'
  }
}));

const FormTabs = styled(Tabs)(({theme}) => ({
  '& .MuiTab-root.Mui-selected': {
    color: theme.palette.indigo.main
  },
  '@media (max-width: 599px)': {
    '& .MuiTab-root': {
      width: 'calc(100% / 3)'
    }
  }
}));

const ColumnAccordionSummary = styled(AccordionSummary)(({theme}) => ({
  '&.Mui-expanded': {
    minHeight: 24
  },
  '& > .MuiAccordionSummary-content.Mui-expanded': {
    marginTop: '12px',
    marginBottom: '12px'
  }
}));

const OptionsWrapper = styled(Box)(({theme}) => ({
  '& > .MuiTextField-root': {
    marginLeft: '4px',
    marginRight: '4px',
    width: 'calc(50% - 8px - 17px)'
  }
}));

const ExtendedOptionsForm = styled(Box)(({theme}) => ({
  '& > .MuiTextField-root': {
    marginLeft: '4px',
    marginRight: '4px',
    marginBottom: '12px',
    width: 'calc(100% - 8px)'
  }
}));

const Bootstrap5CodeHighlightWrapper = styled(Paper)(({theme}) => ({
  '& pre': {
    marginBottom: '0'
  },
  '& code.html': {
    padding: '16px'
  }
}));

const ExportImportMenu = styled(Menu)(({theme}) => ({
  '& .MuiButtonBase-root': {
    width: '146.75px'
  },
  '@media (max-width: 599px)': {
    '& .MuiPaper-root': {
      width: '100%'
    },
    '& .MuiButtonBase-root': {
      width: '100%'
    }
  }
}));

export {
  Bootstrap5CodeHighlightWrapper,
  ColumnAccordionSummary,
  ExtendedOptionsForm,
  ExportImportMenu,
  FormTabs,
  OptionsWrapper,
  MenuItemIndigo
};
