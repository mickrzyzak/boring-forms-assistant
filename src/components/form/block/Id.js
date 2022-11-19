import React from 'react';
import { connect } from 'react-redux';
import { setColumnId } from '../../../features/form/formSlice';
import { TextField } from '@mui/material';

class Id extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <TextField
        id={idPrefix+'-id'}
        label="ID"
        variant="outlined"
        size="small"
        color="indigo"
        margin="normal"
        fullWidth={true}
        value={this.props.id}
        onChange={event => {
          this.props.dispatch(
            setColumnId({
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
  id:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].id : null
});

export default connect(
  mapStateToProps,
  null
)(Id);
