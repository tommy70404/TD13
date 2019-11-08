import React, { useState } from 'react';
import {
  FormControl,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Button,
  IconButton,
  makeStyles,
  Popover,
} from '@material-ui/core';

interface IPopRadioGroupFieldProps {
  onChange: (v: any) => void;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    popperPaper: {
      padding: theme.spacing(1),
    },
    radioGroup: {
      fontSize: theme.typography.h5.fontSize,
    },
  }),
  { name: 'PopRadioGroupField' },
);

export const PopRadioGroupField = (props: IPopRadioGroupFieldProps) => {
  const [state, setState] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRadioClick = (e: any) => {
    setState(e.target.value);
    props.onChange(e.target.value);
    setAnchorEl(null);
  };

  const renderNumberRadios = (optionNum = 0) => {
    return (
      <Box marginLeft="12px" clone>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={state}
            onClick={handleRadioClick}
            className={classes.radioGroup}
          >
            {new Array(optionNum).fill(0).map((v, idx) => (
              <FormControlLabel
                value={idx.toString()}
                label={idx.toString()}
                control={<Radio />}
                key={idx}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        {props.children || 0}
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Paper className={classes.popperPaper}>{renderNumberRadios(9)}</Paper>
      </Popover>
    </>
  );
};
