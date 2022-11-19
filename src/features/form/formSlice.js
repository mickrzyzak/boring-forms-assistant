import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: []
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addRow: (state, action) => {
      let columns = { columns: [] };
      for(let i = 0; i < action.payload; i++) {
        columns.columns.push({ type: '' });
      }
      state.rows.push(columns);
    },
    removeRow: (state, action) => {
      state.rows = state.rows.filter((row, index) => index !== action.payload);
    },
    transformRowColumns: (state, action) => {
      let newCols = [];
      for(let i = 0; i < action.payload.cols; i++) {
        if(i <= state.rows[action.payload.id].columns.length - 1) {
          newCols.push(state.rows[action.payload.id].columns[i]);
        } else {
          newCols.push({ type: '' });
        }
      }
      state.rows[action.payload.id].columns = newCols;
    },
    moveRowUp: (state, action) => {
      let row = state.rows[action.payload.id - 1].columns;
      state.rows[action.payload.id - 1].columns = state.rows[action.payload.id].columns;
      state.rows[action.payload.id].columns = row;
    },
    moveRowDown: (state, action) => {
      let row = state.rows[action.payload.id + 1].columns;
      state.rows[action.payload.id + 1].columns = state.rows[action.payload.id].columns;
      state.rows[action.payload.id].columns = row;
    },
    importData: (state, action) => {
      state.rows = action.payload;
    },
    setColumnType: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      // Clear column properties
      delete column.id;
      delete column.name;
      delete column.label;
      delete column.inputType;
      delete column.min;
      delete column.max;
      delete column.position;
      delete column.options;
      delete column.required;
      // Set column type
      column.type = action.payload.value;
      // Set column properties for text type
      if(action.payload.value === 'text') {
        column.id = 'q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.name = 'q_'+(action.payload.row + 1)+'_'+(action.payload.column + 1);
        column.label = 'Q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.inputType = 'text'
        column.min = '';
        column.max = '';
        column.required = false;
      }
      // Set column properties for textarea type
      else if(action.payload.value === 'textarea') {
        column.id = 'q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.name = 'q_'+(action.payload.row + 1)+'_'+(action.payload.column + 1);
        column.label = 'Q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.min = '';
        column.max = '';
        column.required = false;
      }
      // Set column properties for select type
      else if(action.payload.value === 'select') {
        column.id = 'q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.name = 'q_'+(action.payload.row + 1)+'_'+(action.payload.column + 1);
        column.label = 'Q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.options = [{ value: '', label: '' }];
        column.required = false;
      }
      // Set column properties for checks type
      else if(action.payload.value === 'checks') {
        column.options = [{ id: '', name: '', value: '', label: '', required: false }];
      }
      // Set column properties for radios type
      else if(action.payload.value === 'radios') {
        column.id = 'q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.name = 'q_'+(action.payload.row + 1)+'_'+(action.payload.column + 1);
        column.label = 'Q-'+(action.payload.row + 1)+'-'+(action.payload.column + 1);
        column.options = [{ value: '', label: '' }];
        column.required = false;
      }
      // Set column properties for button type
      else if(action.payload.value === 'button') {
        column.label = 'Submit';
        column.position = 'left';
      }
    },
    setColumnId: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.id = action.payload.value;
    },
    setColumnName: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.name = action.payload.value;
    },
    setColumnLabel: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.label = action.payload.value;
    },
    setColumnRequired: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.required = action.payload.value;
    },
    setColumnInputType: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.inputType = action.payload.value;
    },
    setColumnMin: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.min = action.payload.value;
    },
    setColumnMax: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.max = action.payload.value;
    },
    setColumnPosition: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.position = action.payload.value;
    },
    addOption: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options.push({ value: '', label: '' });
    },
    addExtendedOption: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options.push({ id: '', name: '', value: '', label: '', required: false });
    },
    removeOption: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options = column.options.filter((option, index) => {
        return index !== action.payload.option;
      });
    },
    setOptionId: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options[action.payload.option].id = action.payload.value;
    },
    setOptionName: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options[action.payload.option].name = action.payload.value;
    },
    setOptionValue: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options[action.payload.option].value = action.payload.value;
    },
    setOptionLabel: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options[action.payload.option].label = action.payload.value;
    },
    setOptionRequired: (state, action) => {
      let column = state.rows[action.payload.row].columns[action.payload.column];
      column.options[action.payload.option].required = action.payload.value;
    }
  }
});

export const {
  addRow,
  removeRow,
  transformRowColumns,
  moveRowUp,
  moveRowDown,
  importData,
  setColumnType,
  setColumnId,
  setColumnName,
  setColumnLabel,
  setColumnRequired,
  setColumnInputType,
  setColumnMin,
  setColumnMax,
  setColumnPosition,
  addOption,
  addExtendedOption,
  removeOption,
  setOptionId,
  setOptionName,
  setOptionValue,
  setOptionLabel,
  setOptionRequired
} = formSlice.actions;

export const selectRows = (state) => {
  return state.form.rows.map(row => ({
    columns: row.columns.map(col => ({
      type: col.type,
      name: col.name,
      label: col.label
    }))
  }));
}

export const selectAllData = (state) => {
  return state.form.rows;
}

export default formSlice.reducer;
