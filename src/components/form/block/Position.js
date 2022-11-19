import React from 'react';
import { connect } from 'react-redux';
import { setColumnPosition } from '../../../features/form/formSlice';
import { FormControl, InputLabel, Select } from '@mui/material';
import { MenuItemIndigo } from '../../CustomMuiComponents';

class Position extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.position !== nextProps.position;
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
          id={idPrefix+'-position-label'}
          color="indigo"
        >
          Position
        </InputLabel>
        <Select
          labelId={idPrefix+'-position-label'}
          id={idPrefix+'-position'}
          label="Position"
          color="indigo"
          value={this.props.position}
          onChange={event => {
            this.props.dispatch(
              setColumnPosition({
                row: this.props.pos.row,
                column: this.props.pos.col,
                value: event.target.value
              })
            );
          }}
        >
          <MenuItemIndigo value="left">
            Left
          </MenuItemIndigo>
          <MenuItemIndigo value="center">
            Center
          </MenuItemIndigo>
          <MenuItemIndigo value="right">
            Right
          </MenuItemIndigo>
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = (state, props) => ({
  position:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].position : null
});

export default connect(
  mapStateToProps,
  null
)(Position);
