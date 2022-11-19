import React from 'react';
import { connect } from 'react-redux';
import {
  addExtendedOption,
  removeOption,
  setOptionId,
  setOptionName,
  setOptionValue,
  setOptionLabel,
  setOptionRequired
} from '../../../features/form/formSlice';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import { ExtendedOptionsForm } from '../../CustomMuiComponents';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

class ExtendedOptions extends React.Component {

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.options) !== JSON.stringify(nextProps.options);
  }

  options() {

    let idPrefix = 'form-'+this.props.pos.row+'-'+this.props.pos.col+'-options-';

    return (
      this.props.options.map((option, index) => {
        return (
          <Paper
            key={index}
            variant="outlined"
            square={true}
            sx={{ px: 1, py: 2, mt: .5, mb: 1 }}
          >
            <ExtendedOptionsForm
              component="form"
              noValidate={true}
              autoComplete="off"
            >
              <TextField
                id={idPrefix+index+'-id'}
                label="ID"
                variant="outlined"
                size="small"
                color="indigo"
                value={this.props.options[index].id}
                onChange={event => {
                  this.props.dispatch(
                    setOptionId({
                      row: this.props.pos.row,
                      column: this.props.pos.col,
                      option: index,
                      value: event.target.value
                    })
                  );
                }}
              />
              <TextField
                id={idPrefix+index+'-name'}
                label="Name"
                variant="outlined"
                size="small"
                color="indigo"
                value={this.props.options[index].name}
                onChange={event => {
                  this.props.dispatch(
                    setOptionName({
                      row: this.props.pos.row,
                      column: this.props.pos.col,
                      option: index,
                      value: event.target.value
                    })
                  );
                }}
              />
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
              <Box sx={{ mx: .5 }}>
                <FormControlLabel
                  control={
                    <Switch
                      id={idPrefix+index+'-required'}
                      color="indigo"
                      checked={this.props.options[index].required}
                      onChange={event => {
                        this.props.dispatch(
                          setOptionRequired({
                            row: this.props.pos.row,
                            column: this.props.pos.col,
                            option: index,
                            value: event.target.checked
                          })
                        );
                      }}
                    />
                  }
                  label="Required"
                />
                <IconButton
                  aria-label="Remove row"
                  color="error"
                  size="small"
                  sx={{ float: 'right', mt: .25 }}
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
              </Box>
            </ExtendedOptionsForm>
          </Paper>
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
        <Box>
          {this.options()}
          <Button
            size="small"
            color="success"
            sx={{ my: 0 }}
            onClick={() => {
              this.props.dispatch(
                addExtendedOption({
                  row: this.props.pos.row,
                  column: this.props.pos.col
                })
              );
            }}
          >
            Add option
          </Button>
        </Box>
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
)(ExtendedOptions);
