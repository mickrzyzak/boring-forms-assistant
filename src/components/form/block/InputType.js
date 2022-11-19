import React from 'react';
import { connect } from 'react-redux';
import { setColumnInputType } from '../../../features/form/formSlice';
import { FormControl, InputLabel, Select } from '@mui/material';
import { MenuItemIndigo } from '../../CustomMuiComponents';

class InputType extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.inputType !== nextProps.inputType;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <FormControl
        fullWidth={true}
        size="small"
        margin="normal"
      >
        <InputLabel
          id={idPrefix+'-inputType-label'}
          color="indigo"
        >
          Input type
        </InputLabel>
        <Select
          labelId={idPrefix+'-inputType-label'}
          id={idPrefix+'-inputType'}
          label="Input type"
          color="indigo"
          value={this.props.inputType}
          onChange={event => {
            this.props.dispatch(
              setColumnInputType({
                row: this.props.pos.row,
                column: this.props.pos.col,
                value: event.target.value
              })
            );
          }}
        >
          <MenuItemIndigo value="text">
            Text
          </MenuItemIndigo>
          <MenuItemIndigo value="number">
            Number
          </MenuItemIndigo>
          <MenuItemIndigo value="email">
            E-mail
          </MenuItemIndigo>
          <MenuItemIndigo value="password">
            Password
          </MenuItemIndigo>
          <MenuItemIndigo value="hidden">
            Hidden
          </MenuItemIndigo>
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = (state, props) => ({
  inputType:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].inputType : null
});

export default connect(
  mapStateToProps,
  null
)(InputType);
