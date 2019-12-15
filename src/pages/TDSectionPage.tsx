import React, { useState } from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { PageWrapper } from '../ui/PageWrapper';
import { Box, Grid, Container, Typography, IconButton, Button } from '@material-ui/core';
import { PaperButton } from '../ui/Button';
import clsx from 'clsx';
import { PopField } from '../ui/PopField';

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
    },
    popOptions: {
      width: 250,
      background: lighten('#9b9b9b', 0.3),
    },
  }),
  { name: 'TDSectionPage' },
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
      return { title: order };
    });
  // }

  //   return Array(count)
  //     .fill('')
  //     .map((e, i) => {
  //       const order = i + 1 > 9 ? `${i + 1}` : `0${i + 1}`;
  //       return { title: order };
  //     });
}

export const TDSectionPage = () => {
  const [pageInfo, setPageInfo] = useState({ route: 'list ', curretnSection: '' });
  const [sections, setSections] = useState(init_sections);
  const [focusEl, setFocusEl] = useState();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

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
    setPageInfo(prev=> ({...prev, route:'section', curretnSection: sectionId}))
  };

  const handleItmeMove = (sourceId: string, itemIdx: number, targetId: string) => {
    setSections(prev => {
      const cpPrev = [...prev];
      const sourceIdx = cpPrev.findIndex(s => s.id === sourceId);
      const targetIdx = cpPrev.findIndex(s => s.id === targetId);
      if (sourceIdx !== -1 && targetIdx !== -1) {
        // console.log('should move', sourceId, targetId);
        const movedItem = cpPrev[sourceIdx].item.splice(itemIdx, 1);
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
                    className: classes.item,
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

  const renderSingleSection = () => (
    <Grid container>
      {sections
        .find(s => s.id === pageInfo.curretnSection)?.item.map(i => (
          <Grid key={i.title}>
            <Button>{i.title}</Button>
          </Grid>
        ) || undefined)}
    </Grid>
  );

  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg">
          <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            <Grid item container xs wrap="nowrap" alignItems="center">
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
