import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRows, removeRow, transformRowColumns, moveRowUp, moveRowDown } from '../../features/form/formSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Alert, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import Column from './Column';

function CreateColumnToStart() {
  return (
    <Alert
      severity="info"
      variant="outlined"
      sx={{ mb: 2 }}
    >
      Create a column to start
    </Alert>
  );
}

function RowOptions(props) {

  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const breakpoint600px = useMediaQuery('(min-width:600px)');

  const transformColumns = columns => {
    dispatch(transformRowColumns({
      id: props.id,
      cols: columns
    }));
  }

  const moveRow = direction => {
    if(direction === 'up') {
      dispatch(moveRowUp({ id: props.id }));
    } else if(direction === 'down') {
      dispatch(moveRowDown({ id: props.id }));
    }
  }

  return (
    <>
      <Grid
        item={true}
        xs={6}
        key={props.id+'-1'}
      >
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}
        >
          Row {props.id + 1}
        </Typography>
      </Grid>
      <Grid
        item={true}
        xs={6}
        sx={{ textAlign: 'right' }}
        key={props.id+'-2'}
      >
        <Button
          id={'options-menu-button-'+props.id}
          onClick={event => setMenuAnchorEl(event.currentTarget)}
          size="small"
          sx={{ mb: breakpoint600px ? .5 : 0 }}
        >
          OPTIONS
        </Button>
        <Menu
          id={'options-menu-'+props.id}
          anchorEl={menuAnchorEl}
          open={menuAnchorEl !== null}
          onClose={() => setMenuAnchorEl(null)}
        >
          {props.id !== 0
            ? <MenuItem onClick={() => {
                setMenuAnchorEl(null);
                moveRow('up');
              }}>
                Move up
              </MenuItem>
            : null
          }
          {props.id !== props.rows - 1
            ? <MenuItem onClick={() => {
                setMenuAnchorEl(null);
                moveRow('down');
              }}>
                Move down
              </MenuItem>
            : null
          }
          {props.cols !== 1
            ? <MenuItem onClick={() => {
                setMenuAnchorEl(null);
                transformColumns(1);
              }}>
                Transform into one-column
              </MenuItem>
            : null
          }
          {props.cols !== 2
            ? <MenuItem onClick={() => {
                setMenuAnchorEl(null);
                transformColumns(2);
              }}>
                Transform into two-column
              </MenuItem>
            : null
          }
          {props.cols !== 3
            ? <MenuItem onClick={() => {
                setMenuAnchorEl(null);
                transformColumns(3);
              }}>
                Transform into three-column
              </MenuItem>
            : null
          }
          <MenuItem onClick={() => {
            setMenuAnchorEl(null);
            dispatch(removeRow(props.id));
          }}>
            Remove row
          </MenuItem>
        </Menu>
      </Grid>
    </>
  );
}

function Rows() {

  const rows = useSelector(selectRows);

  const breakpoint600px = useMediaQuery('(min-width:600px)');

  let response = [];
  for(let i = 0; i < rows.length; i++) {
    let columns = [];
    for(let ii = 0; ii < rows[i].columns.length; ii++) {
      columns.push(
        <Grid
          item={true}
          xs={12}
          md={12 / rows[i].columns.length}
          key={ii}
        >
          <Column
            pos={{ row: i, col: ii }}
            type={rows[i].columns[ii].type}
            name={rows[i].columns[ii].name}
            label={rows[i].columns[ii].label}
          />
        </Grid>
      );
    }
    response.push(
      <Grid
        container={true}
        columnSpacing={2}
        rowSpacing={breakpoint600px ? 0 : 1}
        key={i}
        sx={{ mb: 3 }}
      >
        <RowOptions
          id={i}
          cols={rows[i].columns.length}
          rows={rows.length}
        />
        {columns}
      </Grid>
    );
  }

  return (
    <>
      {response.length
        ? response
        : <CreateColumnToStart />}
    </>
  );
}

export default Rows;
