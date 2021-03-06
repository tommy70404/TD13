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
  Typography,
} from '@material-ui/core';

interface IPopRadioGroupFieldProps {
  value: any;
  onChange: (v: any) => void;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    popperPaper: {
      padding: theme.spacing(1),
    },
    radioGroup: {
      '& .MuiFormControlLabel-root': {
        // alignItems: 'flex-end',
      },
      '& .MuiSvgIcon-root': {
        width: 30,
        height: 30,
      },
      '& .MuiTypography-body1': {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    btn: {
      color: theme.palette.grey[700],
    },
  }),
  { name: 'PopRadioGroupField' },
);

export const PopRadioGroupField = ({
  onChange,
  value,
  ...props
}: IPopRadioGroupFieldProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRadioClick = (e: any) => {
    onChange(e.target.value);
    setAnchorEl(null);
  };

  const renderNumberRadios = (optionNum = 0) => {
    return (
      <Box marginLeft="12px" clone>
        <FormControl component="fieldset">
          <RadioGroup
            row
            defaultValue={value}
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
        <Typography variant="h5" className={classes.btn}>
          {props.children || 0}
        </Typography>
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Paper className={classes.popperPaper}>{renderNumberRadios(9)}</Paper>
      </Popover>
    </>
  );
};
