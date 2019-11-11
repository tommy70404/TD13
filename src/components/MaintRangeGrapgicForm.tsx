import React, { useState } from 'react';
import { Grid, Box, makeStyles, Typography, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';

interface IMaintRangeGrapgicFormProps {
  state: any;
  handleChange: (k: string) => (v: any) => void;
}

const useStyles = makeStyles(
  theme => ({
    circleLabel: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: ' center',
      alignItems: ' center',
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      fontSize: theme.typography.h6.fontSize,
      marginRight: theme.spacing(8),
    },
    graphicContainer: {
      position: 'relative',
      // marginLeft: theme.spacing(2.5),
    },
    graphicBtn: {
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: '0% 0%',
      '&::after': {
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        zIndex: -1,
        // preload background
        content:
          'url(../assets/img/B3.png) url(../assets/img/B3E.png) url(../assets/img/B3N.png) url(../assets/img/B3S.png) url(../assets/img/B3W.png) url(../assets/img/B1B2.png) url(../assets/img/B1B2E.png) url(../assets/img/B1B2N.png) url(../assets/img/B1B2S.png) url(../assets/img/B1B2W.png)',
      },
    },
    navigator: {
      backgroundImage: 'url(../assets/img/navigator.png)',
      // position: 'absolute',
      // top: 38,
      // right: 100,
      height: 38,
      width: 100,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: '0% 0%',
    },
    B3Img: {
      width: '500px',
      height: '180px',
      top: -50,
    },
    B1B2Img: {
      width: '500px',
      height: '220px',
      top: -85,
    },
  }),
  { name: 'MaintRangeGrapgicForm' },
);

// 順序與click oreder綁定，盡量別改動
const B3ImgArr = ['B3.png', 'B3W.png', 'B3N.png', 'B3E.png', 'B3S.png'];
const B1B2ImgArr = [
  'B1B2.png',
  'B1B2W.png',
  'B1B2N.png',
  'B1B2E.png',
  'B1B2S.png',
];

export const MaintRangeGrapgicForm = ({
  state,
  handleChange,
}: IMaintRangeGrapgicFormProps) => {
  const classes = useStyles();

  const handleClick = (k: string) => (v: number) => {
    const prevValue = state[k] || [];
    const existIdx = prevValue.findIndex((value: number) => value === v);
    if (existIdx === -1) {
      handleChange(k)([...prevValue, v]);
    } else {
      prevValue.splice(existIdx, 1);
      handleChange(k)([...prevValue]);
    }
  };

  const getB3Img = (state['B3'] && state['B3'].length > 0 ? state['B3'] : [0])
    .reverse()
    .reduce(
      (acc: string, cur: number, idx: number, arr: Array<any>) =>
        acc.concat(
          `url(../assets/img/${B3ImgArr[cur]}) ${
            idx === arr.length - 1 ? '' : ','
          }`,
        ),
      '',
    );

  const getB1B2Img = (state['B1B2'] && state['B1B2'].length > 0
    ? state['B1B2']
    : [0]
  )
    .reverse()
    .reduce(
      (acc: string, cur: number, idx: number, arr: Array<any>) =>
        acc.concat(
          `url(../assets/img/${B1B2ImgArr[cur]}) ${
            idx === arr.length - 1 ? '' : ','
          }`,
        ),
      '',
    );

  return (
    <Box height="200px" clone>
      <Grid container>
        <Grid item container wrap="nowrap" justify="space-between" sm={12}>
          <Typography variant="h4" color="primary">
            澆鑄機
          </Typography>
          <div className={classes.navigator} />
        </Grid>
        <Grid item container sm={6}>
          <Grid
            item
            container
            sm="auto"
            alignItems="flex-start"
            style={{ width: 'auto' }}
          >
            <div className={classes.circleLabel}>B3</div>
          </Grid>
          <Grid
            item
            container
            sm
            alignItems="center"
            className={classes.graphicContainer}
          >
            <div
              style={{ backgroundImage: getB3Img }}
              className={clsx([classes.graphicBtn, classes.B3Img])}
            >
              <svg viewBox="0 0 425 174.6" height="180" width="350">
                <g style={{ transform: 'translateY(-20px)' }}>
                  <path
                    d="M 0 44 L 438 44 L 349 98 L 90 98 Z"
                    fill="transparent"
                    onClick={() => handleClick('B3')(1)}
                  />
                  <path
                    d="M 438 44 L 438 200 L 349 154 L 349 98 Z"
                    fill="transparent"
                    onClick={() => handleClick('B3')(2)}
                  />
                  <path
                    d="M 349 154 L 438 200 L 216 227 L 0 205 L 89 154 Z"
                    fill="transparent"
                    onClick={() => handleClick('B3')(3)}
                  />
                  <path
                    d="M 89 154 L 0 205 L 0 44 L 90 98 Z"
                    fill="transparent"
                    onClick={() => handleClick('B3')(4)}
                  />
                </g>
              </svg>
            </div>
          </Grid>
        </Grid>
        <Grid item container sm={6}>
          <Grid
            item
            container
            sm="auto"
            alignItems="flex-start"
            style={{ width: 'auto' }}
          >
            <div className={classes.circleLabel}>B1 + B2</div>
          </Grid>
          <Grid
            item
            container
            sm
            alignItems="center"
            className={classes.graphicContainer}
          >
            <div
              style={{ backgroundImage: getB1B2Img }}
              className={clsx([classes.graphicBtn, classes.B1B2Img])}
            >
              <svg viewBox="0 0 435 260" height="220" width="375">
                <path
                  d="M 0 84 L 137 84 L 170 0 L 222 0 L 255 84 L 427 84 L 340 136 L 243 106 L 208 14 L 186 14 L 150 106 L 87 136 Z"
                  fill="transparent"
                  onClick={() => handleClick('B1B2')(1)}
                />
                <path
                  d="M 427 84 L 427 238 L 426 240 L 344 190 L 340 136 Z"
                  fill="transparent"
                  onClick={() => handleClick('B1B2')(2)}
                />
                <path
                  d="M 0 240 L 82 190 L 344 190 L 426 240 L 200 260 Z"
                  fill="transparent"
                  onClick={() => handleClick('B1B2')(3)}
                />
                <path
                  d="M 0 84 L 82 137 L 82 190 L 0 240 Z"
                  fill="transparent"
                  onClick={() => handleClick('B1B2')(4)}
                />
              </svg>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
