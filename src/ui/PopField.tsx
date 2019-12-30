import React, { useState } from 'react';
import Close from '@material-ui/icons/Close';
import { Paper, Button, IconButton, makeStyles, Popover, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';

interface IPopFieldProps {
  windowTitle?: string;
  btnLabel?: string;
  children?: React.ReactNode;
  buttonProps?: any;
  paperProps?: any;
}

const useStyles = makeStyles(
  theme => ({
    popperPaper: {
      padding: theme.spacing(0),
    },
    poperTitleRow: {
      padding: ` 0 ${theme.spacing(1)}px`,
      background: theme.palette.primary.main,
      color: 'white',
    },
    btn: {
      color: theme.palette.grey[700],
    },
    popContentWrapper: {
      width: 'auto',
      padding: '12px 6px',
    },
  }),
  { name: 'PopField' },
);

export const PopField = ({ windowTitle, btnLabel, buttonProps, paperProps, ...props }: IPopFieldProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeBtn, setActiveBtn] = useState<null | string>(null);
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderPopup = () => {
    return (
      <Grid container style={{ width: 'auto', height: 'auto' }}>
        <Grid item container xs={12} justify="space-between" alignItems="center" className={classes.poperTitleRow}>
          <Typography variant="h4">{windowTitle}</Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close color="inherit" />
          </IconButton>
        </Grid>
        <Grid item xs={12} className={classes.popContentWrapper}  onClick={handleClose}>
          {props.children}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick} {...buttonProps}>
        {btnLabel}
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Paper className={classes.popperPaper} {...paperProps}>
          {renderPopup()}
        </Paper>
      </Popover>
    </>
  );
};
