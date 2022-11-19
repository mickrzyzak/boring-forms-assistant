import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { importData, selectAllData } from '../features/form/formSlice';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function SaveData(props) {

  const dispatch = useDispatch();
  const allData = useSelector(selectAllData);

  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem('formData', JSON.stringify(allData));
    setSaved(true);
  }

  useEffect(() => {
    // Load stored data at startup
    let localData = localStorage.getItem('formData');
    if(localData !== null) {
      try {
        let parsedCode = JSON.parse(localData);
        dispatch(importData(parsedCode));
      } catch(e) {}
    }
  }, [dispatch]);

  useEffect(() => {
    setSaved(false);
  }, [allData]);

  return (
    <Button
      id="save-button"
      variant="outlined"
      color={saved ? 'primary' : 'error'}
      startIcon={saved ? <DoneAllIcon /> : <DoneIcon />}
      onClick={save}
    >
      {saved ? 'Saved' : 'Save'}
    </Button>
  );
}

export default SaveData;
