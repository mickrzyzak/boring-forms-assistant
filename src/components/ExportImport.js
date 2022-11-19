import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllData, importData } from '../features/form/formSlice';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField
} from '@mui/material';
import { ExportImportMenu } from './CustomMuiComponents';

function ExportImport() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [dialogExportOpen, setDialogExportOpen] = useState(false);
  const [dialogImportOpen, setDialogImportOpen] = useState(false);

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setMenuOpen(false);
  }

  const DialogExport = () => {

    const allData = useSelector(selectAllData);

    const selectCode = () => {
      document.querySelector('#export-input').select();
    }

    return (
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={dialogExportOpen}
        onClose={() => setDialogExportOpen(false)}
      >
        <DialogTitle>
          Export
        </DialogTitle>
        <DialogContent>
          <TextField
            id="export-input"
            label="Code"
            variant="outlined"
            color="indigo"
            fullWidth={true}
            inputProps={{ readOnly: true }}
            value={JSON.stringify(allData)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="indigo"
            onClick={() => selectCode()}
          >
            Select code
          </Button>
          <Button onClick={() => setDialogExportOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const DialogImport = () => {

    const dispatch = useDispatch();

    const [code, setCode] = useState('');
    const [importDisabled, setImportDisabled] = useState(true);
    const [invalidJsonAlert, setInvalidJsonAlert] = useState(false);

    const codeChange = event => {
      setCode(event.target.value);
      setImportDisabled(event.target.value.length === 0);
      setInvalidJsonAlert(false);
    }

    const importCode = () => {
      try {
        let parsedCode = JSON.parse(code);
        dispatch(importData(parsedCode));
        setCode('');
        setDialogImportOpen(false);
      } catch(e) {
        setInvalidJsonAlert(true);
      }
    }

    return (
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={dialogImportOpen}
        onClose={() => setDialogImportOpen(false)}
      >
        <DialogTitle>
          Import
        </DialogTitle>
        <DialogContent>
          {invalidJsonAlert
            ? <Alert severity="error" sx={{ mb: 1 }}>
                Invalid JSON code!
              </Alert>
            : null
          }
          <TextField
            id="import-input"
            label="Code"
            variant="outlined"
            color="indigo"
            fullWidth={true}
            sx={{ mt: 1 }}
            value={code}
            onChange={codeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="indigo"
            disabled={importDisabled}
            onClick={() => importCode()}
          >
            Import
          </Button>
          <Button onClick={() => setDialogImportOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <DialogExport />
      <DialogImport />
      <Button
        id="export-import-button"
        variant="outlined"
        onClick={event => {
          setMenuAnchorEl(event.currentTarget);
          setMenuOpen(true);
        }}
      >
        Export/Import
      </Button>
      <ExportImportMenu
        id="export-import-menu"
        anchorEl={menuAnchorEl}
        open={menuOpen}
        sx={{ mt: .5 }}
        onClose={() => closeMenu()}
      >
        <MenuItem onClick={() => {
          setDialogExportOpen(true);
          closeMenu();
        }}>
          Export
        </MenuItem>
        <MenuItem onClick={() => {
          setDialogImportOpen(true);
          closeMenu();
        }}>
          Import
        </MenuItem>
      </ExportImportMenu>
    </>
  );
}

export default ExportImport;
