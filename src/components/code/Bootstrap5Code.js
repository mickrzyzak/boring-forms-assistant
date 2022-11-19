import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector } from 'react-redux';
import { selectAllData } from '../../features/form/formSlice';
import { Alert, Box, Button } from '@mui/material';
import { Bootstrap5CodeHighlightWrapper } from '../CustomMuiComponents';
import Highlight from 'react-highlight';

function Bootstrap5CodeGenerator() {

  const allData = useSelector(selectAllData);

  const codeText = (id, name, label, inputType, min, max, required) => {
    return (
      <>
        {'        '}
        <label htmlFor={id} className="form-label" >
          {label + (required ? '*' : '')}
        </label>
        {'\n        '}
        <input
          className="form-control"
          id={id}
          name={name}
          type={inputType}
          min={inputType === 'number' ? min : undefined}
          max={inputType === 'number' ? max : undefined}
          minLength={inputType !== 'number' ? min : undefined}
          maxLength={inputType !== 'number' ? max : undefined}
          required={required}
        />
        {'\n'}
      </>
    );
  }

  const codeTextarea = (id, name, label, min, max, required) => {
    return (
      <>
        {'        '}
        <label htmlFor={id} className="form-label" >
          {label + (required ? '*' : '')}
        </label>
        {'\n        '}
        <textarea
          className="form-control"
          rows="3"
          id={id}
          name={name}
          minLength={min}
          maxLength={max}
          required={required}
        ></textarea>
        {'\n'}
      </>
    );
  }

  const codeSelect = (id, name, label, options, required) => {
    return (
      <>
        {'        '}
        <label htmlFor={id} className="form-label" >
          {label + (required ? '*' : '')}
        </label>
        {'\n        '}
        <select
          className="form-select"
          id={id}
          name={name}
          required={required}
        >
          {'\n            '}
          <option value="">Select</option>
          {'\n'}
          {options.map((option, i) =>
            <React.Fragment key={i}>
              {'            '}
              <option value={option.value}>
                {option.label}
              </option>
              {'\n'}
            </React.Fragment>
          )}
          {'        '}
        </select>
        {'\n'}
      </>
    );
  }

    const codeChecks = (options) => {
      return (
        <>
          {options.map((option, i) =>
            <React.Fragment key={i}>
              {'        '}
              <div className="form-check">
                {'\n            '}
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={option.id}
                  name={option.name}
                  value={option.value}
                  required={option.required}
                />
                {'\n            '}
                <label
                  className="form-check-label"
                  htmlFor={option.id}
                >
                  {option.label + (option.required ? '*' : '')}
                </label>
                {'\n        '}
              </div>
              {'\n'}
            </React.Fragment>
          )}
        </>
      );
    }

  const codeRadios = (id, name, label, options, required) => {
    return (
      <>
        {'        '}
        <label className="form-label">
          {label + (required ? '*' : '')}
        </label>
        {'\n'}
        {options.map((option, i) =>
          <React.Fragment key={i}>
            {'        '}
            <div className="form-check">
              {'\n            '}
              <input
                className="form-check-input"
                type="radio"
                id={id}
                name={name}
                value={option.value}
                required={required}
              />
              {'\n            '}
              <label
                className="form-check-label"
                htmlFor={id}
              >
                {option.label}
              </label>
              {'\n        '}
            </div>
            {'\n'}
          </React.Fragment>
        )}
      </>
    );
  }

  const codeButton = (label, position) => {
    return (
      <>
        {'        '}
        <div className={
          position === 'left' ? 'text-start' :
          position === 'center' ? 'text-center' :
          position === 'right' ? 'text-end' : ''
        }>
          {'\n            '}
          <button
            type="submit"
            className="btn btn-primary"
          >
            {'\n                '}
            {label}
            {'\n            '}
          </button>
          {'\n        '}
        </div>
        {'\n'}
      </>
    );
  }

  let response = [];
  for(let i = 0; i < allData.length; i++) {
    let columns = [];
    for(let ii = 0; ii < allData[i].columns.length; ii++) {
      let column = allData[i].columns[ii];
      columns.push(
        <React.Fragment key={ii}>
          {'    '}<div className="col-12 col-md mb-3">{'\n'}
            {column.type === 'text'
              ? codeText(
                  column.id,
                  column.name,
                  column.label,
                  column.inputType,
                  column.min,
                  column.max,
                  column.required
                )
              : null
            }
            {column.type === 'textarea'
              ? codeTextarea(
                  column.id,
                  column.name,
                  column.label,
                  column.min,
                  column.max,
                  column.required
                )
              : null
            }
            {column.type === 'select'
              ? codeSelect(
                  column.id,
                  column.name,
                  column.label,
                  column.options,
                  column.required
                )
              : null
            }
            {column.type === 'checks'
              ? codeChecks(
                  column.options
                )
              : null
            }
            {column.type === 'radios'
              ? codeRadios(
                  column.id,
                  column.name,
                  column.label,
                  column.options,
                  column.required
                )
              : null
            }
            {column.type === 'button'
              ? codeButton(
                  column.label,
                  column.position
                )
              : null
            }
          {'    '}</div>{'\n'}
        </React.Fragment>
      );
    }
    response.push(
      <React.Fragment key={i}>
        <div className="row">{'\n'}
          {columns}
        </div>{'\n'}
      </React.Fragment>
    );
  }

  return response;
}

function Bootstrap5Code() {

  const response = Bootstrap5CodeGenerator();

  const selectCode = () => {
    let range = document.createRange();
    range.selectNode(document.querySelector('code'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }

  return (
    response.length
      ? <>
          <Box sx={{
            textAlign: { xs: 'right', sm: 'left' },
            mb: .5
          }}>
            <Button
              variant="text"
              color="indigo"
              onClick={() => selectCode()}
            >
              Select code
            </Button>
          </Box>
          <Bootstrap5CodeHighlightWrapper
            variant="outlined"
            square={true}
          >
            <Highlight className="html">
              {renderToStaticMarkup(response)}
            </Highlight>
          </Bootstrap5CodeHighlightWrapper>
        </>
      : <Alert severity="info" variant="outlined">
          There is nothing to show. First, create the columns in the Editor.
        </Alert>
  );
}

export { Bootstrap5CodeGenerator };
export default Bootstrap5Code;
