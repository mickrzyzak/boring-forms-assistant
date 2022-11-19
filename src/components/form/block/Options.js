import React from 'react';
import { connect } from 'react-redux';
import {
  addOption,
  removeOption,
  setOptionValue,
  setOptionLabel
} from '../../../features/form/formSlice';
import { Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import { OptionsWrapper } from '../../CustomMuiComponents';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

class Options extends React.Component {

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.options) !== JSON.stringify(nextProps.options);
  }

  options() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col+'-options-';

    return (
      this.props.options.map((option, index) => {
        return (
          <OptionsWrapper
            key={index}
            component="form"
            noValidate
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            <TextField
              id={idPrefix+index+'-value'}
              label="Value"
              variant="outlined"
              size="small"
              color="indigo"
              value={this.props.options[index].value}
              onChange={event => {
                this.props.dispatch(
                  setOptionValue({
                    row: this.props.pos.row,
                    column: this.props.pos.col,
                    option: index,
                    value: event.target.value
                  })
                );
              }}
            />
            <TextField
              id={idPrefix+index+'-label'}
              label="Label"
              variant="outlined"
              size="small"
              color="indigo"
              value={this.props.options[index].label}
              onChange={event => {
                this.props.dispatch(
                  setOptionLabel({
                    row: this.props.pos.row,
                    column: this.props.pos.col,
                    option: index,
                    value: event.target.value
                  })
                );
              }}
            />
            <IconButton
              aria-label="Remove row"
              color="error"
              size="small"
              sx={{ mt: .375 }}
              onClick={() => {
                this.props.dispatch(
                  removeOption({
                    row: this.props.pos.row,
                    column: this.props.pos.col,
                    option: index
                  })
                );
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </OptionsWrapper>
        );
      })
    );
  }

  render() {
    return (
      <>
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            mt: 1.5
          }}
        >
          Options
        </Typography>
        <Paper
          variant="outlined"
          square={true}
          sx={{ p: 1, mt: .5, mb: 1 }}
        >
          {this.options()}
          <Button
            size="small"
            color="success"
            sx={{ mt: 1 }}
            onClick={() => {
              this.props.dispatch(
                addOption({
                  row: this.props.pos.row,
                  column: this.props.pos.col
                })
              );
            }}
          >
            Add option
          </Button>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  options:
    typeof state.form.rows[props.pos.row] !== 'undefined'
    && typeof state.form.rows[props.pos.row].columns[props.pos.col] !== 'undefined' ?
      state.form.rows[props.pos.row].columns[props.pos.col].options : null
});

export default connect(
  mapStateToProps,
  null
)(Options);
