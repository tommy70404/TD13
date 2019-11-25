import React, { useState } from 'react';
import Close from '@material-ui/icons/Close';
import { Paper, Button, IconButton, makeStyles, Popover, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
const tdImg = require('../../assets/img/td_popup.png');

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
    imgBtnWrapper: {
      padding: 16,
    },
    flatBtn: {
      color: 'white',
      boxShadow: theme.shadows[0],
      borderRadius: 4,
      fontSize: theme.typography.h4.fontSize,
      padding: '6px 12px',
      '&::after': {
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        zIndex: -1,
        // preload background
        content: `url(${tdImg})`,
      },
    },
  }),
  { name: 'PopGraphicField' },
);

export const PopTdInfoButton = () => {
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

  return (
    <>
      <Button
        aria-describedby={id}
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleClick}
        className={classes.flatBtn}
      >
        TD 資料
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        <Paper className={classes.popperPaper}>
          <Grid container style={{ width: 'auto', height: 'auto' }}>
            <Grid item container xs={12} justify="space-between" alignItems="center" className={classes.poperTitleRow}>
              <Typography variant="h4">TD 資料</Typography>
              <IconButton color="inherit" onClick={handleClose}>
                <Close color="inherit" />
              </IconButton>
            </Grid>
            <Grid item container xs={12} justify="space-around" alignItems="stretch" className={classes.imgBtnWrapper}>
              <img src={tdImg} />
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
};
