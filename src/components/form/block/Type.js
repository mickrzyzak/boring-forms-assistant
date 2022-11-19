import React from 'react';
import { connect } from 'react-redux';
import { setColumnType } from '../../../features/form/formSlice';
import { FormControl, InputLabel, Select } from '@mui/material';
import { MenuItemIndigo } from '../../CustomMuiComponents';

class Type extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.type !== nextProps.type;
  }

  render() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col;

    return (
      <FormControl
        fullWidth={true}
        size="small"
        margin="normal"
        sx={{ mt: 1 }}
      >
        <InputLabel
          id={idPrefix+'-type-label'}
          color="indigo"
        >
          Type
        </InputLabel>
        <Select
          labelId={idPrefix+'-type-label'}
          id={idPrefix+'-type'}
          label="Type"
          color="indigo"
          value={this.props.type}
          onChange={event => {
            this.props.dispatch(
              setColumnType({
                row: this.props.pos.row,
                column: this.props.pos.col,
                value: event.target.value
              })
            );
          }}
        >
          <MenuItemIndigo value="">
            Empty
          </MenuItemIndigo>
          <MenuItemIndigo value="text">
            Text
          </MenuItemIndigo>
          <MenuItemIndigo value="textarea">
            Textarea
          </MenuItemIndigo>
          <MenuItemIndigo value="select">
            Select
          </MenuItemIndigo>
          <MenuItemIndigo value="checks">
            Checks
          </MenuItemIndigo>
          <MenuItemIndigo value="radios">
            Radios
          </MenuItemIndigo>
          <MenuItemIndigo value="button">
            Button
          </MenuItemIndigo>
        </Select>
      </FormControl>
    );
  }
}

export default connect(
  null,
  null
)(Type);
