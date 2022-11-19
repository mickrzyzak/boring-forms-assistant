import React from 'react';
import { connect } from 'react-redux';
import { setColumnName } from '../../../features/form/formSlice';
import { TextField } from '@mui/material';

class Name extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <TextField
        id={idPrefix+'-name'}
        label="Name"
        variant="outlined"
        size="small"
        color="indigo"
        margin="normal"
        fullWidth={true}
        value={this.props.name}
        onChange={event => {
          this.props.dispatch(
            setColumnName({
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
  name:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].name : null
});

export default connect(
  mapStateToProps,
  null
)(Name);
