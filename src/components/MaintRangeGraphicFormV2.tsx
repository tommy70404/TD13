import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface IMaintRangeGrapgicFormV2Props {
  state?: any;
  handleChange?: (k: string) => (v: any) => void;
}

function importAll(r: any) {
  let images: any = [];
  r.keys().forEach((item: any, index: number) => {
    images.push(item.replace('./', ''));
  });
  return images;
}

// 遍例指定資料夾，並抓出特定檔案
const images_B1B2 = importAll(require.context('../assets/img/B1B2/', false, /\.(png|jpe?g|svg)$/)).sort(
  (a: string, b: string) => parseInt(a.match(/[0-9]*/)![0]) - parseInt(b.match(/[0-9]*/)![0]),
);
const images_B3 = importAll(require.context('../assets/img/B3/', false, /\.(png|jpe?g|svg)$/)).sort(
  (a: string, b: string) => parseInt(a.match(/[0-9]*/)![0]) - parseInt(b.match(/[0-9]*/)![0]),
);

const useStyles = makeStyles(
  theme => ({
    circleLabel: {
      width: 150,
      height: 50,
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      justifyContent: ' center',
      alignItems: ' center',
      backgroundColor: theme.palette.grey[500],
      color: 'white',
      fontSize: theme.typography.h6.fontSize,
      marginRight: theme.spacing(8),
    },
    graphicContainer: {
      position: 'relative',
      // marginLeft: theme.spacing(2.5),
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
    graphicBtn: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: '0% 0%',
    },
    B1B2Img: {
      width: '529px',
      height: '310px',
      // top: -85,
      zIndex: 10,
    },
    B3Img: {
      width: '533px',
      height: '263px',
      // top: -50,
      zIndex: 10,
    },
  }),
  { name: 'MaintRangeGraphicFormV2' },
);

// 順序與click oreder綁定，盡量別改動
// const B1B2ImgArr = ['B1B2.png', 'B1B2W.png', 'B1B2N.png', 'B1B2E.png', 'B1B2S.png'];
// const B3ImgArr = ['B3.png', 'B3W.png', 'B3N.png', 'B3E.png', 'B3S.png'];

export const MaintRangeGraphicFormV2 = ({ state, handleChange }: IMaintRangeGrapgicFormV2Props) => {
  const [innerState, setInnerState] = useState<any>({});
  const classes = useStyles();

  const handleClick = (k: string) => (v: number) => {
    const prevValue = innerState[k] || [];
    const existIdx = prevValue.findIndex((value: number) => value === v);
    if (existIdx === -1) {
      handleChange && handleChange(k)([...prevValue, v]);
      setInnerState((prev: any) => ({ ...prev, [k]: [...prevValue, v] }));
    } else {
      prevValue.splice(existIdx, 1);
      handleChange && handleChange(k)([...prevValue]);
      setInnerState((prev: any) => ({ ...prev }));
    }
  };

  // const getB3Img = (innerState['B3'] && innerState['B3'].length > 0 ? innerState['B3'] : [0]).reduce(
  //   (acc: string, cur: number, idx: number, arr: Array<any>) =>
  //     acc.concat(`url(../assets/img/B3/${images_B3[cur]}) ${idx === arr.length - 1 ? '' : ','}`),
  //   '',
  // );

  // const getB1B2Img = (innerState['B1B2'] && innerState['B1B2'].length > 0 ? innerState['B1B2'] : [0]).reduce(
  //   (acc: string, cur: number, idx: number, arr: Array<any>) =>
  //     acc.concat(`url(../assets/img/B1B2/${images_B1B2[cur]}) ${idx === arr.length - 1 ? '' : ','}`),
  //   '',
  // );

  const renderB1B2SvgTouch = () =>
    B1B2SvgArr.map((point, i) => (
      <polygon
        points={point}
        fill="transparent"
        onClick={() => handleClick('B1B2')(i + 1)}
        style={{ zIndex: 100 }}
        key={i}
      />
    ));
  const rederB1B2SvgView = () =>
    B1B2SvgArr.map((point, i) => {
      if ((innerState['B1B2'] && innerState['B1B2'].includes(i + 1)) || false) {
        return <polygon points={point} fill="#f5a623" style={{ zIndex: 1 }} key={i} />;
      }
      return undefined;
    });

  const renderB3SvgTouch = () =>
    B3SvgArr.map((point, i) => (
      <polygon
        points={point}
        fill="transparent"
        onClick={() => handleClick('B3')(i + 1)}
        style={{ zIndex: 100 }}
        key={i}
      />
    ));
  const rederB3SvgView = () =>
    B3SvgArr.map((point, i) => {
      if ((innerState['B3'] && innerState['B3'].includes(i + 1)) || false) {
        return <polygon points={point} fill="#f5a623" style={{ zIndex: 1 }} key={i} />;
      }
      return undefined;
    });

  return (
    <Grid container style={{ height: 'auto' }}>
      <Grid item container sm={12}>
        <Grid item container sm={6} alignItems="flex-start" style={{ width: 'auto' }}>
          <div className={classes.circleLabel}>B1 + B2</div>
        </Grid>
        <Grid item container wrap="nowrap" justify="flex-end" sm={6}>
          <div className={classes.navigator} />
        </Grid>
        <Grid
          item
          container
          sm={12}
          alignItems="center"
          className={classes.graphicContainer}
          style={{ height: '300px' }}
        >
          <div
            style={{ backgroundImage: `url(../assets/img/B1B2/0.png` }}
            className={clsx([classes.graphicBtn, classes.B1B2Img])}
          />
          <svg
            viewBox="0 0 529 310"
            width="529"
            height="310"
            className={clsx([classes.graphicBtn, classes.B1B2Img])}
            style={{ left: '50.1%', zIndex: 50 }}
          >
            {renderB1B2SvgTouch()}
          </svg>
          <svg
            viewBox="0 0 529 310"
            height="529"
            width="310"
            className={clsx([classes.graphicBtn, classes.B1B2Img])}
            style={{ left: '50.1%', zIndex: 1 }}
          >
            {rederB1B2SvgView()}
          </svg>
        </Grid>
      </Grid>
      <Grid item container sm={12}>
        <Grid item container sm={6} alignItems="flex-start" style={{ width: 'auto' }}>
          <div className={classes.circleLabel}>B3</div>
        </Grid>
        <Grid
          item
          container
          sm={12}
          alignItems="center"
          className={classes.graphicContainer}
          style={{ height: '300px' }}
        >
          <div
            style={{ backgroundImage: `url(../assets/img/B3/0.png` }}
            className={clsx([classes.graphicBtn, classes.B3Img])}
          />
          <svg
            viewBox="0 0 533 263"
            width="533"
            height="263"
            className={clsx([classes.graphicBtn, classes.B3Img])}
            style={{ zIndex: 50 }}
          >
            {renderB3SvgTouch()}
          </svg>
          <svg
            viewBox="0 0 533 263"
            width="533"
            height="263"
            className={clsx([classes.graphicBtn, classes.B3Img])}
            style={{ zIndex: 1 }}
          >
            >{rederB3SvgView()}
          </svg>
        </Grid>
      </Grid>
    </Grid>
  );
};

const B1B2SvgArr = [
  '39.9,88.5 39,90.2 83.8,116.7 181.2,89.9 180.4,88.9 39.9,88.5',
  '82,117.3 125.7,144.1 199.7,113.3 157.8,96.5 82,117.3',
  '158,96.9 197.6,113.5 218.1,52.3 199.6,44.5 183.3,89.7 158,96.9',
  '272.4,1.6 290.8,46.8 273.1,54.4 257.4,14.6 231.3,14.4 218.8,54.2 200.6,46.6 217.1,1.5 272.4,1.6',
  '337.5,95.7 294.6,112.6 271,52.5 289.5,44.9 307.6,89.7 337.5,95.7',
  '443.5,117.3 398.6,145.1 291.9,112.9 334.1,95.9 443.5,117.3',
  '485.4,89.9 486.3,90.9 444.3,117.4 310.3,90.9 312.2,89.9 485.4,89.9',
  '39,90 39.6,173.6 83.8,173.5 83.4,117.3 39,90',
  '83,117.5 83.1,173.5 127.3,173.4 127.7,144.4 83,117.5',
  '126.1,142.8 126,173 198.5,172.9 198.8,112.5 126.1,142.8',
  '198,109.5 198.1,173.4 262.9,173.3 263,109.5 198,109.5',
  '262.6,110.5 262,173.8 338.4,173.3 339.1,124.9 294.9,111.3 262.6,110.5',
  '337,124.5 337.9,174 399.6,173.8 399.4,143 337,124.5',
  '400.3,143.2 400,173.1 444.6,173.2 444.4,116.5 400.3,143.2',
  '443,116.9 443.2,173.2 486.5,173.1 487.1,89.5 443,116.9',
  '39,253.1 39.4,172.5 83.4,172.5 83.3,225.8 39,253.1',
  '82.4,226.2 82,172.5 126.5,172.5 126.3,200.7 82.4,226.2',
  '126,201.9 126,172.5 198.5,172.5 199.2,201.2 126,201.9',
  '196,200.9 196.7,172.5 263.1,172.5 263.1,201.4 196,200.9',
  '262.1,201.2 262,172.5 336.5,172.5 335.6,201.2 262.1,201.2',
  '335,201.3 335.8,172.5 400,172.6 399.7,201.4 335,201.3',
  '399.1,200.7 399,172.5 443.8,172.6 443.9,226.3 399.1,200.7',
  '443,226.4 443,172.5 486.3,172.6 486.5,250.5 443,226.4',
  '185.5,226.3 197.4,200.5 126.3,200 82.5,226 185.5,226.3',
  '196.7,200.6 185,226.1 349.7,226.2 337.2,200.5 196.7,200.6',
  '348.7,226.1 336.6,200.3 401.4,200.5 444.9,225.9 348.7,226.1',
  '39.5,252.7 166.8,264.5 185.3,224.6 83.2,224.5 39,251.4 39.5,252.7',
  '185.1,225.5 166,265.3 244.8,272.6 367.2,262.9 350.2,225.5 185.1,225.5',
  '348,225.5 366.7,263.8 487,253.3 487.2,251 442.9,225.5 348,225.5',
];

const B3SvgArr = [
  '45,39 166.3,38.4 185.5,65.7 89.1,66 45,39',
  '267.9,38.4 165,38.7 184,65.7 268,65.5 267.9,38.4',
  '267,38.4 368.7,38.9 348.6,66 267,65.9 267,38.4',
  '489.2,39 488,38.6 365.9,38.4 346,66.1 445.3,66 489.2,39',
  '43.1,38.4 43.1,121.3 86.9,121.4 86.9,65 43.1,38.4',
  '132,91.7 132.1,121.5 87.5,121.6 87,64.4 132,91.7',
  '185.2,66.4 204,93.1 132.2,93.8 87,66.5 185.2,66.4',
  '184,65.4 203.3,92.4 268.4,92.1 268.4,65.4 184,65.4',
  '349.7,64.4 330.5,91.2 267,91.6 267,64.4 349.7,64.4',
  '350,64.6 330,91.6 406.6,91.9 449.9,64.4 350,64.6',
  '446.4,121.8 404,121.8 404.1,92.1 446.4,65.4 446.4,121.8',
  '205,121 131,121.2 131.6,91.4 205,91.4 205,121',
  '204.4,121.5 268.5,121.8 268.5,91.9 204,91.4 204.4,121.5',
  '329.4,121.4 267,121.3 267.1,91.6 329.6,91.4 329.4,121.4',
  '328.1,123.4 404.3,123.4 404.5,93.9 328,93.4 328.1,123.4',
  '488.9,38.4 491.5,38.5 491.7,120.9 445,120.9 445.1,65.4 488.9,38.4',
  '88.4,120.6 88.2,175.4 43.5,202.4 43,120.4 88.4,120.6',
  '88.1,120.4 88,175.6 132.1,149.8 131.4,120.7 88.1,120.4',
  '131,148.3 204.7,148.4 204.5,119.5 131.1,119.4 131,148.3',
  '205,149.3 268.7,150.3 269.1,120.7 205.1,120.4 205,149.3',
  '267,149.3 329.4,149.7 329.4,120.6 267.1,120.4 267,149.3',
  '328.7,149.6 405.1,150 404.7,120.3 328.7,120.2 328.7,149.6',
  '446.6,120.6 446.9,175.2 404,149.5 404.3,120.4 446.6,120.6',
  '445.4,120.3 445.4,174.2 491,200.9 492.6,201.2 492.4,120.4 445.4,120.3',
  '193.7,175.9 86,176.3 131.2,149.4 205.1,150.1 193.7,175.9',
  '193,175.9 267.6,175.6 268,149.8 203.9,149.4 193,175.9',
  '340.1,176 267,175.9 267.2,150 329.4,149.4 340.1,176',
  '339.6,175.9 447.3,175.8 446.5,173.6 405.3,149.4 329,149.4 339.6,175.9',
  '194.8,175.4 88,175.4 44.1,201.2 44,202.9 179.4,214.4 194.8,175.4',
  '193.9,175.4 268.1,175.5 268,221.9 178,214.7 193.9,175.4',
  '339.6,174.7 267,174.4 267.1,221.7 355,213.9 339.6,174.7',
  '338,174.7 447.8,174.4 491.3,199.9 491.5,202.1 353.6,214 338,174.7',
];
