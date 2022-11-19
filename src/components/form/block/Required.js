import React from 'react';
import { connect } from 'react-redux';
import { setColumnRequired } from '../../../features/form/formSlice';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

class Required extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.required !== nextProps.required;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              id={idPrefix+'-required'}
              color="indigo"
              checked={this.props.required}
              onChange={event => {
                this.props.dispatch(
                  setColumnRequired({
                    row: this.props.pos.row,
                    column: this.props.pos.col,
                    value: event.target.checked
                  })
                );
              }}
            />
          }
          label="Required"
        />
      </FormGroup>
    );
  }
}

const mapStateToProps = (state, props) => ({
  required:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].required : null
});

export default connect(
  mapStateToProps,
  null
)(Required);
