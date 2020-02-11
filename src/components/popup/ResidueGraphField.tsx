import React, { useState } from 'react';
import Close from '@material-ui/icons/Close';
import { Paper, Button, IconButton, makeStyles, Popover, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';

interface IResidueGraphFieldProps {
  title?: string;
  value?: any;
  onChange?: (v: any) => void;
  children?: React.ReactNode;
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
    imgBtnWrapper: {
      padding: 5,
    },
    imgBtn: {
      width: 158,
      height: 226,
      backgroundRepeat: 'no-repeat !important',
      fontSize: theme.typography.h4.fontSize,
    },
    active: {
      // border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    },
  }),
  { name: 'ResidueGraphField' },
);

const DEFAULT_OPTIONS = [
  { label: '<20cm', img: 'option_0.png', imgActive: 'option_0_active.png' },
  { label: '>20cm', img: 'option_1.png', imgActive: 'option_1_active.png' },
  { label: '>20cm\n怪手打除', img: 'option_2.png', imgActive: 'option_2_active.png' },
];

export const ResidueGraphField = ({ onChange, value, title, ...props }: IResidueGraphFieldProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeBtn, setActiveBtn] = useState<null | string>(null);
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleImgBtnClick = (v: string) => {
    setActiveBtn(v);
    // setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRadioClick = (e: any) => {
    onChange && onChange(e.target.value);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderGrphicOptions = () => {
    return (
      <Grid container style={{ width: 'auto', height: 'auto' }}>
        <Grid item container xs={12} justify="space-between" alignItems="center" className={classes.poperTitleRow}>
          <Typography variant="h4">{title}</Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close color="inherit" />
          </IconButton>
        </Grid>
        <Grid item container xs={12} justify="space-around" alignItems="stretch" className={classes.imgBtnWrapper}>
          {DEFAULT_OPTIONS.map(o => (
            <Button
              disableRipple
              onClick={() => handleImgBtnClick(o.label)}
              className={clsx(classes.imgBtn, {
                [classes.active]: activeBtn === o.label,
              })}
              style={{ background: `url(/assets/img/residue_options/${activeBtn === o.label ? o.imgActive : o.img})` }}
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
          {props.children || activeBtn || DEFAULT_OPTIONS[0].label}
        </Typography>
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Paper className={classes.popperPaper}>{renderGrphicOptions()}</Paper>
      </Popover>
    </>
  );
};
