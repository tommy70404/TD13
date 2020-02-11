import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Modal, IconButton, Paper } from '@material-ui/core';

import { ButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';
import { WarningRounded } from '@material-ui/icons';
import { IconButtonProps } from '@material-ui/core/IconButton';

const useStyles = makeStyles(
  theme => ({
    container: {},
    innerWrapper: {
      width: 228,
      height: 136,
      padding: 2,
      borderRadius: theme.shape.borderRadius,
      color: 'white',
      border: '2px solid white',
      background: theme.palette.primary.main,
      transition: '.2s all ease-in-out',
      '&:hover': {
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        background: 'white',
      },
    },
    dense: {
      width: 220,
      height: 55,
      padding: 0,
    },
    modalPaper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: theme.spacing(2),
    },
    modalBtn: {
      ...theme.typography.h5,
    },
    icon: {
      position: 'relative',
      top: '.2em',
      marginRight: 8,
    },
  }),
  { name: 'PaperButton' },
);

interface IPaperButtonProps extends ButtonProps {
  children: React.ReactNode;
  dense?: boolean;
}

export const PaperButton = ({ children, dense = false, ...props }: IPaperButtonProps) => {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={clsx(classes.innerWrapper, {
          [classes.dense]: dense,
        })}
      >
        <Typography color="inherit" variant="h3">
          {children}
        </Typography>
      </Grid>
    </Button>
  );
};

type IComfirmPopupButtonProps = IconButtonProps & {
  onClick: () => void;
  iconButton?: boolean;
};

export const ComfirmPopupButton = ({ iconButton = false, onClick, style, ...props }: IComfirmPopupButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = useStyles();

  const handleBtnClick = (e: Event) => {
    setIsModalOpen(true);
    e.stopPropagation();
  };

  const handleBgClick = (e: Event) => {
    setIsModalOpen(false);
    e.stopPropagation();
  };

  const handleComfirm = (e: Event) => {
    onClick();
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleCancel = (e: Event) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      {!iconButton && (
        <div onClick={(e: any) => handleBtnClick(e)} style={style}>
          {props.children}
        </div>
      )}
      {iconButton && (
        <IconButton onClick={(e: any) => handleBtnClick(e)} style={style} {...props}>
          {props.children}
        </IconButton>
      )}
      <Modal open={isModalOpen} onBackdropClick={(e: any) => handleBgClick(e)}>
        <Paper className={classes.modalPaper}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item container xs={12} justify="center">
              <Grid item xs="auto">
                <WarningRounded fontSize="large" color="error" className={classes.icon} />
                <Typography variant="h4" style={{ display: 'inline' }}>
                  是否確認執行?
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={(e: any) => handleCancel(e)} className={classes.modalBtn}>
                取消
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={(e: any) => handleComfirm(e)} className={classes.modalBtn}>
                確認
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
};
