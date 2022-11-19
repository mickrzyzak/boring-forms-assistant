import React from 'react';
import {
  Accordion,
  AccordionDetails,
  Paper,
  Typography
} from '@mui/material';
import { ColumnAccordionSummary } from '../CustomMuiComponents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TypeBlock from './block/Type';
import IdBlock from './block/Id';
import NameBlock from './block/Name';
import LabelBlock from './block/Label';
import InputTypeBlock from './block/InputType';
import MinMaxBlock from './block/MinMax';
import OptionsBlock from './block/Options';
import ExtendedOptionsBlock from './block/ExtendedOptions';
import RequiredBlock from './block/Required';
import PositionBlock from './block/Position';

function Column(props) {

  const pos = { row: props.pos.row, col: props.pos.col };

  let blocks = [];
  let key = pos.row+'-'+pos.col+'-';

  if(props.type === 'text') {
    blocks.push(<IdBlock pos={pos} key={key+'Id'} />);
    blocks.push(<NameBlock pos={pos} key={key+'Name'} />);
    blocks.push(<LabelBlock pos={pos} key={key+'Label'} />);
    blocks.push(<InputTypeBlock pos={pos} key={key+'InputType'} />);
    blocks.push(<MinMaxBlock pos={pos} key={key+'MinMax'} />);
    blocks.push(<RequiredBlock pos={pos} key={key+'Required'} />);
  }

  if(props.type === 'textarea') {
    blocks.push(<IdBlock pos={pos} key={key+'Id'} />);
    blocks.push(<NameBlock pos={pos} key={key+'Name'} />);
    blocks.push(<LabelBlock pos={pos} key={key+'Label'} />);
    blocks.push(<MinMaxBlock pos={pos} key={key+'MinMax'} />);
    blocks.push(<RequiredBlock pos={pos} key={key+'Required'} />);
  }

  if(props.type === 'select') {
    blocks.push(<IdBlock pos={pos} key={key+'Id'} />);
    blocks.push(<NameBlock pos={pos} key={key+'Name'} />);
    blocks.push(<LabelBlock pos={pos} key={key+'Label'} />);
    blocks.push(<OptionsBlock pos={pos} key={key+'Options'} />);
    blocks.push(<RequiredBlock pos={pos} key={key+'Required'} />);
  }

  if(props.type === 'checks') {
    blocks.push(<ExtendedOptionsBlock pos={pos} key={key+'Options'} />);
  }

  if(props.type === 'radios') {
    blocks.push(<IdBlock pos={pos} key={key+'Id'} />);
    blocks.push(<NameBlock pos={pos} key={key+'Name'} />);
    blocks.push(<LabelBlock pos={pos} key={key+'Label'} />);
    blocks.push(<OptionsBlock pos={pos} key={key+'Options'} />);
    blocks.push(<RequiredBlock pos={pos} key={key+'Required'} />);
  }

  if(props.type === 'button') {
    blocks.push(<LabelBlock pos={pos} key={key+'Label'} />);
    blocks.push(<PositionBlock pos={pos} key={key+'Position'} />);
  }

  return (
    <Paper
      variant="outlined"
      square={true}
      sx= {{ mb: { xs: 1.5, md: 0 } }}
    >
      <Accordion
        defaultExpanded={true}
        square={true}
        sx={{ boxShadow: 0 }}
      >
        <ColumnAccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ wordBreak: 'break-all' }}>
            <Typography
              component="span"
              sx={{ textTransform: 'capitalize' }}
            >
              {props.type ? props.type : 'Empty'}
            </Typography>
            {props.label ? ' - '+props.label : ''}
          </Typography>
        </ColumnAccordionSummary>
        <AccordionDetails>
          <TypeBlock pos={pos} type={props.type} />
          {blocks}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default Column;
