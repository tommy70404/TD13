import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography, Button } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { PopTdInfoButton } from '../components/popup/PopTdInfoButton';
import { IReactComProps } from '../utils/types';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      minHeight: 71,
    },
  }),
  { name: 'NavigatorBar' },
);

interface INavigatorBarProps extends IReactComProps {
  title: string;
  to?: string;
  goBack?: boolean;
}

export const NavigatorBar = ({ title, to, goBack = false, ...props }: INavigatorBarProps) => {
  const history = useHistory();
  const classes = useStyles();

  const handleArrowClick = () => {
    if (to) {
      history.push(to);
    } else {
      if (goBack) {
        history.goBack();
      }
    }
  };

  return (
    <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={1} className={classes.row}>
      <Grid item container xs wrap="nowrap" alignItems="center">
        {(to || goBack) && (
          <IconButton size="small" onClick={handleArrowClick}>
            <KeyboardArrowLeft color="primary" fontSize="large" style={{ fontSize: '3.5rem' }} />
          </IconButton>
        )}
        <Typography color="primary" variant="h3">
          {title}
        </Typography>
      </Grid>
      <Grid item>{props.children}</Grid>
    </Grid>
  );
};
