import React from 'react';
import { connect } from 'react-redux';
import { setColumnMin, setColumnMax } from '../../../features/form/formSlice';
import { Stack, TextField } from '@mui/material';

class MinMax extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.min !== nextProps.min || this.props.max !== nextProps.max;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 2, mb: 1 }}
      >
        <TextField
          id={idPrefix+'-min'}
          label="Min"
          variant="outlined"
          size="small"
          color="indigo"
          type="number"
          fullWidth={true}
          inputProps={{ min: 1 }}
          value={this.props.min}
          onChange={event => {
            this.props.dispatch(
              setColumnMin({
                row: this.props.pos.row,
                column: this.props.pos.col,
                value: event.target.value
              })
            );
          }}
        />
        <TextField
          id={idPrefix+'-max'}
          label="Max"
          variant="outlined"
          size="small"
          color="indigo"
          type="number"
          fullWidth={true}
          inputProps={{ min: 1 }}
          value={this.props.max}
          onChange={event => {
            this.props.dispatch(
              setColumnMax({
                row: this.props.pos.row,
                column: this.props.pos.col,
                value: event.target.value
              })
            );
          }}
        />
      </Stack>
    );
  }
}

const mapStateToProps = (state, props) => ({
  min:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].min : null,
  max:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].max : null
});

export default connect(
  mapStateToProps,
  null
)(MinMax);
