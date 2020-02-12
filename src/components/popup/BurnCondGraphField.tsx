import React, { useState } from 'react';
import Close from '@material-ui/icons/Close';
import { Paper, Button, IconButton, makeStyles, Popover, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';

interface IBurnCondGraphFieldProps {
  title?: string;
  value?: any;
  onChange?: (v: any) => void;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  theme => ({
    popperPaper: {
      width: 500,
      padding: theme.spacing(0),
    },
    poperTitleRow: {
      padding: ` 0 ${theme.spacing(1)}px`,
      background: theme.palette.primary.main,
      color: 'white',
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
      whiteSpace: 'break-spaces',
      color: theme.palette.grey[700],
    },
    btnWrapper: {
      padding: 5,
    },
    typeBtn: {
      width: '100%',
      height: 48,
      padding: 0,
      border: `solid 5px ${theme.palette.divider}`,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.grey[400],
      '& .MuiButton-label': {
        lineHeight: 'normal',
      },
      '&:hover': {
        background: 'transparent',
        border: `5px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
      '&.active': {
        background: 'transparent',
        border: `5px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
    },
    optionsBtn: {
      width: 158,
      height: 158,
      fontSize: theme.typography.h4.fontSize,
      '&:hover': {
        // border: `5px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
      '& .active': {
        color: theme.palette.primary.main,
      },
    },
  }),
  { name: 'BurnCondGraphField' },
);

const TYPE_OPTIONS = [{ label: '壁部' }, { label: '底部' }];

const WALL_OPTIONS = [
  { label: '低', img: 'option_wall_low.png', imgActive: 'option_wall_low_active.png' },
  { label: '中', img: 'option_wall_medium.png', imgActive: 'option_wall_medium_active.png' },
  { label: '高', img: 'option_wall_high.png', imgActive: 'option_wall_high_active.png' },
];
const BOTTOM_OPTIONS = [
  { label: '低', img: 'option_bottom_low.png', imgActive: 'option_bottom_low_active.png' },
  { label: '中', img: 'option_bottom_medium.png', imgActive: 'option_bottom_medium_active.png' },
  { label: '高', img: 'option_bottom_high.png', imgActive: 'option_bottom_high_active.png' },
];

export const BurnCondGraphField = ({ onChange, value, title, ...props }: IBurnCondGraphFieldProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeOption, setActiveOption] = useState<null | string>('高');
  const [activeType, setActiveType] = useState<null | string>('壁部');
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleImgBtnClick = (v: string) => {
    setActiveOption(v);
    // setAnchorEl(null);
  };

  const handleTypeBtnClick = (v: string) => {
    setActiveType(v);
    // setAnchorEl(null);
  };

  const handleClose = () => {
    onChange && onChange(activeType || '' + activeOption || '');
    setAnchorEl(null);
  };

  const handleRadioClick = (e: any) => {
    onChange && onChange(e.target.value);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const LEVEL_OPTIONS = activeType === '壁部' ? WALL_OPTIONS : BOTTOM_OPTIONS;
  const renderGrphicOptions = () => {
    return (
      <Grid container style={{ width: 'auto', height: 'auto' }}>
        <Grid item container xs={12} justify="space-between" alignItems="center" className={classes.poperTitleRow}>
          <Typography variant="h4">{title}</Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close color="inherit" />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="space-around"
          alignItems="stretch"
          className={classes.btnWrapper}
        >
          {TYPE_OPTIONS.map(o => (
            <Grid item xs style={{ padding: 4 }} key={o.label}>
              <Button
                disableRipple
                onClick={() => handleTypeBtnClick(o.label)}
                className={clsx(classes.typeBtn, {
                  active: activeType === o.label,
                })}
              >
                {o.label}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12} justify="space-around" alignItems="stretch" className={classes.btnWrapper}>
          {LEVEL_OPTIONS.map(o => (
            <Button
              disableRipple
              onClick={() => handleImgBtnClick(o.label)}
              className={clsx(classes.optionsBtn, {
                active: activeOption === o.label,
              })}
              style={{
                background: `url(/assets/img/burn_condense_options/${activeOption === o.label ? o.imgActive : o.img})`,
              }}
              key={o.label}
            />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <Typography variant="h5" className={classes.btn}>
          {props.children || (activeType || '') + '-' + (activeOption || '') || LEVEL_OPTIONS[0].label}
        </Typography>
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <div className={classes.popperPaper}>{renderGrphicOptions()}</div>
      </Popover>
    </>
  );
};
