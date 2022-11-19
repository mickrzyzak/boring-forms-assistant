import React from 'react';
import { connect } from 'react-redux';
import { setColumnLabel } from '../../../features/form/formSlice';
import { TextField } from '@mui/material';

class Label extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.label !== nextProps.label;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <TextField
        id={idPrefix+'-label'}
        label="Label"
        variant="outlined"
        size="small"
        color="indigo"
        margin="normal"
        fullWidth={true}
        value={this.props.label}
        onChange={event => {
          this.props.dispatch(
            setColumnLabel({
              row: this.props.pos.row,
              column: this.props.pos.col,
              value: event.target.value
            })
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  label:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].label : null
});

export default connect(
  mapStateToProps,
  null
)(Label);
