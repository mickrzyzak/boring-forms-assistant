import { Alert, Paper } from '@mui/material';
import { Bootstrap5CodeGenerator } from '../code/Bootstrap5Code';

function Bootstrap5Preview() {

  var bootstrap5Code = Bootstrap5CodeGenerator();

  return (
    bootstrap5Code.length
      ? <Paper
          variant="outlined"
          square={true}
        >
          <div className="bg-light p-3">
            {bootstrap5Code}
          </div>
        </Paper>
      : <Alert severity="info" variant="outlined">
          There is nothing to show. First, create the columns in the Editor.
        </Alert>
  );
}

export default Bootstrap5Preview;
