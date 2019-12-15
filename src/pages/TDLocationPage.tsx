import React, { useState, useEffect } from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, lighten, darken } from '@material-ui/core/styles';
import { PageWrapper } from '../ui/PageWrapper';
import { Box, Grid, Container, Typography, IconButton, Button } from '@material-ui/core';
import { PaperButton } from '../ui/Button';
import clsx from 'clsx';
import { PopField } from '../ui/PopField';
import { sec2time } from '../utils/timeHelper';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    // sectionsWrapper: {
    //   padding: theme.spacing(6)
    // },
    sectionContainer: {
      ...theme.shape,
      minHeight: 400,
      position: 'relative',
      border: 'dashed 6px #9b9b9b',
      padding: theme.spacing(4, 2.5),
      transition: '.3s all ease-in-out',
      '&.active': {
        border: `solid 6px ${theme.palette.primary.main}`,
        '& $sectionTitle': {
          background: `${theme.palette.primary.main}`,
        },
      },
    },
    sectionTitle: {
      ...theme.shape,
      color: 'white',
      position: 'absolute',
      top: 0,
      left: 20,
      transform: 'translateY(-50%)',
      background: '#9b9b9b',
      transition: '.3s all ease-in-out',
      padding: 6,
      minWidth: 120,
      minHeight: 40,
      textAlign: 'center',
    },
    item: {
      ...theme.shape,
      ...theme.typography.h5,
      padding: 0,
      color: 'white',
      boxSizing: 'border-box',
      border: `solid 6px transparent`,
      background: '#9b9b9b',
      minWidth: 120,
      maxHeight: 50,
      '&:hover': {
        background: 'white',
        color: theme.palette.primary.main,
        transition: '.3s all ease-in-out',
        border: `solid 6px ${theme.palette.primary.main}`,
      },
      '&.warning': {
        background: '#d0021b',
        '&:hover': {
          background: 'white',
          color: '#d0021b',
          transition: '.3s all ease-in-out',
          border: `solid 6px #d0021b`,
        },
      },
    },
    popOptions: {
      width: 250,
      background: lighten('#9b9b9b', 0.3),
    },
    itemPanel: {
      maxWidth: 220,
    },
    itemPanelButton: {
      ...theme.typography.h5,
      background: theme.palette.primary.main,
      minHeight: 55,
      '&.warning': {
        background: '#d0021b',
        '&:hover': {
          background: darken('#d0021b', 0.3),
          transition: '.3s all ease-in-out',
          border: `solid 6px #d0021b`,
        },
      },
    },
  }),
  { name: 'TDLocationPage' },
);

// const OPTIONS = [
//   { label: 'B123', to: '/TD/location/B123' },
//   { label: 'S123', to: '/TD/location/S123' },
//   { label: 'S45', to: '/TD/location/S45' },
//   { label: 'S67', to: '/TD/location/S67' },
// ];

const init_sections = [
  {
    id: 'a',
    size: 4,
    title: '使用區',
    item: itemCreator(0, 10),
  },
  {
    id: 'b',
    size: 4,
    title: '預熱區',
    item: itemCreator(11, 13),
  },
  {
    id: 'c',
    size: 4,
    title: '上線區',
    item: itemCreator(14, 17),
  },
  {
    id: 'd',
    size: 6,
    title: '備用區',
    item: itemCreator(18, 24),
  },
  {
    id: 'e',
    size: 6,
    title: '養生區',
    item: itemCreator(25, 30),
  },
];

function itemCreator(from: number, to: number) {
  // if (to && from) {
  const rangeCount = to - from + 1;
  return Array(rangeCount)
    .fill('')
    .map((e, i) => {
      const order = from + i > 9 ? `${from + i}` : `0${from + i}`;
      return { title: order, time: Math.random() * 1000 };
    });
  // }

  //   return Array(count)
  //     .fill('')
  //     .map((e, i) => {
  //       const order = i + 1 > 9 ? `${i + 1}` : `0${i + 1}`;
  //       return { title: order };
  //     });
}

export const TDLocationPage = () => {
  const [pageInfo, setPageInfo] = useState({ route: 'list ', curretnSection: '' });
  const [sections, setSections] = useState(init_sections);
  const [focusEl, setFocusEl] = useState();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  function counter() {
    setSections((prev: typeof init_sections) => {
      const cpPrev = [...prev];
      cpPrev.forEach(section => {
        section.item.forEach(i => {
          i.time = i.time > 0 && i.time - 100 > 0 ? i.time - 100 : 0;
        });
      });
      return cpPrev;
    });
    setTimeout(counter, 1000);
  }

  useEffect(() => {
    setTimeout(counter, 1000);
  }, []);

  const handleClick = (target: string) => {
    history.push(target);
  };

  const handleSectionClick = (v: any) => {
    setFocusEl(v);
  };

  const handleSectionBlur = () => {
    setFocusEl(null);
  };

  const handleSectionNaivgate = (sectionId: string) => {
    setPageInfo(prev => ({ ...prev, route: 'section', curretnSection: sectionId }));
  };

  const handleBack = () => {
    if (pageInfo.route === 'section') {
      setPageInfo(prev => ({ ...prev, route: 'list' }));
    } else {
      history.goBack();
    }
  };

  const handleItmeMove = (sourceId: string, itemIdx: number, targetId: string) => {
    setSections(prev => {
      const cpPrev = [...prev];
      const sourceIdx = cpPrev.findIndex(s => s.id === sourceId);
      const targetIdx = cpPrev.findIndex(s => s.id === targetId);
      if (sourceIdx !== -1 && targetIdx !== -1) {
        // console.log('should move', sourceId, targetId);
        const movedItem = cpPrev[sourceIdx].item.splice(itemIdx, 1);
        movedItem[0].time = Math.random() * 1000;
        // console.log('movedItem',movedItem)
        cpPrev[targetIdx].item.push(movedItem[0]);
        // console.log('prev',prev)
      }
      return cpPrev;
    });
  };

  const renderSection = (section: typeof sections[0]) => {
    return (
      <Grid item xs={section.size as any} container key={section.id}>
        <Grid
          id="1"
          item
          container
          className={clsx(classes.sectionContainer, {
            active: focusEl === section.id,
          })}
          onClick={() => handleSectionClick(section.id)}
          // onBlur={handleSectionBlur}
        >
          <div className={classes.sectionTitle} onClick={() => handleSectionNaivgate(section.id)}>
            <Typography variant="h6">{section.title}</Typography>
          </div>
          <Grid
            item
            container
            xs={12}
            direction={section.size === 4 ? 'column' : 'row'}
            justify="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            wrap="wrap"
            spacing={2}
            style={{ maxHeight: section.size === 4 ? 550 : 350 }}
          >
            {section.item.map((t, i) => (
              <Grid item key={t.title}>
                <PopField
                  windowTitle={`將TD ${t.title} 移動至`}
                  btnLabel={t.title}
                  buttonProps={{
                    className: clsx(classes.item, {
                      warning: t.time === 0,
                    }),
                  }}
                  paperProps={{
                    style: { maxWidth: 300 },
                  }}
                >
                  <Grid container justify="center" spacing={1}>
                    {sections
                      .filter(s => s.id !== section.id)
                      .map(s => (
                        <Grid item container justify="center" xs={12} key={s.id}>
                          <Button
                            className={clsx(classes.item, classes.popOptions)}
                            onClick={() => handleItmeMove(section.id, i, s.id)}
                          >
                            {s.title}
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                </PopField>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderRouteView = () => {
    switch (pageInfo.route) {
      case 'list':
        return renderList();
      case 'section':
        return renderSingleSection();

      default:
        return renderList();
    }
  };

  const renderList = () => (
    <Grid container justify="center" alignItems="flex-start" spacing={2}>
      <Grid item container xs={12} justify="flex-end">
        <img src={require('../assets/img/navigator.png')} alt="navigator" />
      </Grid>
      <Grid item container xs={12} spacing={3} alignItems="stretch">
        {sections.map(renderSection)}
      </Grid>
    </Grid>
  );

  const renderSingleSection = () => {
    const targetSection = sections.find(s => s.id === pageInfo.curretnSection);
    return (
      <Grid container spacing={2}>
        {targetSection &&
          targetSection.item.map(
            (item, i) =>
              (
                <Grid
                  item
                  container
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  direction="column"
                  className={classes.itemPanel}
                  key={item.title}
                >
                  <PopField
                    windowTitle={`將TD ${item.title} 移動至`}
                    btnLabel={item.title}
                    buttonProps={{
                      className: clsx(classes.itemPanelButton, {
                        warning: item.time === 0,
                      }),
                    }}
                    paperProps={{
                      style: { maxWidth: 300 },
                    }}
                  >
                    <Grid container justify="center" spacing={1}>
                      {sections
                        .filter(s => s.id !== targetSection.id)
                        .map(s => (
                          <Grid item container justify="center" xs={12} key={s.id}>
                            <Button
                              className={clsx(classes.item, classes.popOptions)}
                              onClick={() => handleItmeMove(targetSection.id, i, s.id)}
                            >
                              {s.title}
                            </Button>
                          </Grid>
                        ))}
                    </Grid>
                  </PopField>
                  <Typography variant="h5">
                    狀態: {targetSection.title.slice(0, 2) + (item.time === 0 ? '已完成' : '中')}
                  </Typography>
                  <Typography variant="h5">剩餘: {sec2time(item.time)}</Typography>
                </Grid>
              ) || undefined,
          )}
      </Grid>
    );
  };

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            <Grid item container xs wrap="nowrap" alignItems="center">
              <IconButton size="small" onClick={handleBack}>
                <KeyboardArrowLeft color="primary" fontSize="large" style={{ fontSize: '2.5rem' }} />
              </IconButton>
              <Typography color="primary" variant="h3">
                {id} TD 位置圖
              </Typography>
            </Grid>
          </Grid>
          {renderRouteView()}
        </Container>
      </Box>
    </>
  );
};
