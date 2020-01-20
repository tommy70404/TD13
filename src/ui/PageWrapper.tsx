import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import {
  MenuRounded,
  AssignmentIndRounded,
  ViewListRounded,
  HomeWorkRounded,
  SettingsApplicationsRounded,
  ExpandMoreRounded,
  ExpandLessRounded,
  MeetingRoomRounded,
  AccountCircleRounded,
} from '@material-ui/icons';
import * as MuiIcons from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Grid,
  Typography,
  IconButton,
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Collapse,
} from '@material-ui/core';

import background from '../assets/img/background.png';
import { fmtLocalDate } from '../utils/date';
import { thinScrollbarStyle } from './helpers/styleHelpers';

interface IPageWrapperProps {
  title: string;
}

const useStyles = makeStyles(
  theme => ({
    '@keyframes slide': {
      from: { transform: 'translateX(50%)' },
      to: { transform: 'translateX(-100%)' },
    },
    header: {
      color: '#424242',
    },
    drawer: {
      ...thinScrollbarStyle,
      minHeight: '100vh',
      overflowY: 'scroll',
      background: '#9b9b9b',
    },
    list: {
      position: 'relative',
      paddingTop: theme.spacing(3),
      width: 300,
    },
    listItem: {
      padding: theme.spacing(1),
      color: 'white',
      textDecoration: 'none',
      fontSize: '24px',
      '& p:link': {
        textDecoration: 'none',
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    nested: {
      paddingLeft: 62,
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[800],
    },
    activeItme: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    background: {
      background: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
    },
    boardcastWrapper: {
      ...theme.shape,
      width: 600,
      height: 50,
      background: 'rgba(255, 255, 255, 0.9)',
      marginLeft: 'auto',
    },
    boardcastSignal: {
      width: 50,
    },
    boardcastTextContainer: {
      position: 'relative',
      overflow: 'hidden',
      '& > *': {
        animation: '$slide 25s linear infinite',
      },
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
    },
    divider: {
      margin: theme.spacing(2, 2),
      backgroundColor: theme.palette.grey[300],
    },
    accountTitle: {
      display: 'flex',
      marginLeft: theme.spacing(1),
      alignItems: 'center',
      color: 'white',
    },
  }),
  { name: 'PageWrapper' },
);

const boardcasts = ['目前有 2 項 TD 位置狀態需檢查', 'TD 13 耐火材管理系統', '當前使用者 Jack'];

export const menu = [
  {
    text: '修護單管理',
    target: '/',
    icon: <AssignmentIndRounded color="inherit" fontSize="large" />,
    subMenu: [
      {
        text: '新增修護單',
        target: '/maintenance/menu',
        subMenu: [],
      },
      {
        text: '工作紀錄單',
        target: '/maintenance/work_log',
        subMenu: [],
      },
      {
        text: '查詢維護單(空)',
        target: '/',
        subMenu: [],
      },
    ],
  },
  {
    text: 'TD 管理',
    target: '/',
    icon: <ViewListRounded color="inherit" fontSize="large" />,
    subMenu: [
      {
        text: '位置圖',
        target: '/TD/locations',
        subMenu: [],
      },
      {
        text: 'TD狀態列表',
        target: '/TD/status',
        subMenu: [],
      },
    ],
  },
  {
    text: '廠商管理(空)',
    target: '/',
    icon: <HomeWorkRounded color="inherit" fontSize="large" />,
    subMenu: [],
  },
  {
    text: '材料管理',
    target: '/',
    icon: <SettingsApplicationsRounded color="inherit" fontSize="large" />,
    subMenu: [
      {
        text: '供應商履歷(空)',
        target: '/',
        subMenu: [],
      },
      {
        text: '盤點作業(空)',
        target: '/',
        subMenu: [],
      },
    ],
  },
  {
    text: '帳號登出',
    target: '/',
    icon: <MeetingRoomRounded color="inherit" fontSize="large" />,
    subMenu: [],
  },
];

export const PageWrapper = ({ title }: IPageWrapperProps) => {
  const [state, setstate] = useState({ menu: false, systemTime: Date.now() });
  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    const timeworker = setInterval(() => {
      setstate(prev => ({ ...prev, systemTime: Date.now() }));
    }, 1000);
    return () => {
      clearInterval(timeworker);
    };
  }, []);

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Box padding="0px 32px">
          <Grid container alignItems="center">
            <IconButton onClick={() => setstate(prev => ({ ...prev, menu: !prev.menu }))} style={{ marginRight: 8 }}>
              <MenuRounded fontSize="large" color="inherit" />
            </IconButton>
            <Typography variant="h4" color="inherit">
              {title}
            </Typography>
            {/* <IconButton onClick={() => setFull(prev => !prev)} style={{ visibility: 'hidden' }}>
            {(isFull && <FullscreenExitIcon />) || <FullscreenIcon />}
          </IconButton> */}
            <Grid item container xs="auto" wrap="nowrap" className={classes.boardcastWrapper}>
              <Grid item container xs="auto" justify="center" alignItems="center" className={classes.boardcastSignal}>
                <MuiIcons.WarningRounded color="error" fontSize="large" />
              </Grid>
              <Grid item container alignItems="center" className={classes.boardcastTextContainer}>
                <Typography color="error" variant="h5" noWrap style={{ textOverflow: 'initial', overflow: 'visible' }}>
                  {boardcasts.join('　　　　　') +
                    '　　　　　' +
                    '當前時間' +
                    fmtLocalDate('YYYY/MM/DD HH:mm:ss', state.systemTime)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
      <Drawer anchor="left" open={state.menu} onClose={() => setstate(prev => ({ ...prev, menu: false }))}>
        <div className={classes.drawer}>
          <List className={classes.list}>
            {menu.map(m => (
              <MenuItem key={m.text} item={m} route={history.location.pathname} />
            ))}
          </List>
          <div className={classes.footer}>
            <Divider className={classes.divider} />
            <Grid container justify="center">
              <Grid item xs="auto">
                <Avatar>
                  <AccountCircleRounded style={{ width: 40, height: 40 }} />
                </Avatar>
              </Grid>
              <Typography variant="h6" className={classes.accountTitle}>
                Jack
              </Typography>
            </Grid>
          </div>
        </div>
      </Drawer>
      <div className={classes.background} />
    </>
  );
};

interface IMenuItem {
  text: string;
  target: string;
  icon?: JSX.Element;
  subMenu: IMenuItem[];
}

interface IMenuItemProps {
  item: IMenuItem;
  route: string;
  nested?: boolean;
}

function MenuItem(props: IMenuItemProps) {
  const isInSubmenu = Boolean(
    props.route === '/'
      ? false
      : props.item.subMenu.find(
        sub =>
          sub.target ===
            props.route
              .split('/')
              .splice(0, 3)
              .join('/'),
      ),
  );
  const [showSubMenu, setShowSubmenu] = useState(isInSubmenu);
  const { item, nested = false } = props;
  const classes = useStyles();
  const history = useHistory();
  const isActiveItem = useRef(Boolean(item.target.split('/').pop() === props.route.split('/')[2]));

  const handleNavClick = (target: string) => {
    setShowSubmenu(false);
    history.push(target);
  };

  if (item.subMenu && item.subMenu.length) {
    return (
      <>
        <ListItem
          button
          onClick={() => {
            setShowSubmenu(prev => !prev);
          }}
          className={clsx(classes.listItem, { [classes.nested]: nested })}
        >
          {item.icon && <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>}
          <ListItemText disableTypography>{item.text}</ListItemText>
          {showSubMenu ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </ListItem>
        <Collapse in={showSubMenu} timeout="auto" unmountOnExit>
          <List>
            {item.subMenu.map((item, i) => (
              <MenuItem key={i} item={item} route={props.route} nested />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      button
      className={clsx(classes.listItem, { [classes.nested]: nested, [classes.activeItme]: isActiveItem.current })}
      onClick={() => handleNavClick(item.target)}
    >
      {item.icon && <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>}
      <ListItemText disableTypography>{item.text}</ListItemText>
    </ListItem>
  );
}
