import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import MenuRounded from '@material-ui/icons/MenuRounded';
import AssignmentIndRounded from '@material-ui/icons/AssignmentIndRounded';
import ViewListRounded from '@material-ui/icons/ViewListRounded';
import HomeWorkRounded from '@material-ui/icons/HomeWorkRounded';
import SettingsApplicationsRounded from '@material-ui/icons/SettingsApplicationsRounded';
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRounded from '@material-ui/icons/ExpandLessRounded';
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
  Collapse,
} from '@material-ui/core';

import background from '../assets/img/background.png';

interface IPageWrapperProps {
  title: string;
}

const useStyles = makeStyles(
  theme => ({
    header: {
      color: '#424242',
    },
    list: {
      paddingTop: theme.spacing(3),
      height: '100%',
      background: '#9b9b9b',
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
      '&:hover': {},
    },
    nested: {
      paddingLeft: 62,
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
  }),
  { name: 'PageWrapper' },
);

export const menu = [
  {
    text: '維護單管理',
    target: '',
    icon: <AssignmentIndRounded color="inherit" fontSize="large" />,
    subMenu: [
      {
        text: '新增 / 修改維護單',
        target: '/maintenance/menu',
        subMenu: [],
      },
      {
        text: '查詢維護單',
        target: '/maintenance/menu',
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
    ],
  },
  {
    text: '廠商管理',
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
        text: '供應商履歷',
        target: '/',
        subMenu: [],
      },
      {
        text: '盤點作業',
        target: '/',
        subMenu: [],
      },
    ],
  },
];

export const PageWrapper = ({ title }: IPageWrapperProps) => {
  const [state, setstate] = useState({ menu: false });
  const classes = useStyles();

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
          </Grid>
        </Box>
      </AppBar>
      <Drawer anchor="left" open={state.menu} onClose={() => setstate({ menu: false })}>
        <List className={classes.list}>
          {menu.map(m => (
            <MenuItem key={m.text} item={m} />
          ))}
        </List>
      </Drawer>
      <div className={classes.background} />
    </>
  );
};

interface IMenuItem {
  text: string;
  target: string;
  icon?: JSX.Element;
  subMenu?: IMenuItem[];
}

interface IMenuItemProps {
  item: IMenuItem;
  nested?: boolean;
}

function MenuItem(props: IMenuItemProps) {
  const [subMenu, setSubmenu] = useState(false);
  const { item, nested = false } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleNavClick = (target: string) => {
    setSubmenu(false);
    history.push(target);
  };

  if (item.subMenu && item.subMenu.length) {
    return (
      <>
        <ListItem
          button
          onClick={() => {
            setSubmenu(prev => !prev);
          }}
          className={clsx(classes.listItem, { [classes.nested]: nested })}
        >
          {item.icon && <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>}
          <ListItemText disableTypography>{item.text}</ListItemText>
          {subMenu ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </ListItem>
        <Collapse in={subMenu} timeout="auto" unmountOnExit>
          <List>
            {item.subMenu.map((item, i) => (
              <MenuItem key={i} item={item} nested />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem
      button
      className={clsx(classes.listItem, { [classes.nested]: nested })}
      onClick={() => handleNavClick(item.target)}
    >
      {item.icon && <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>}
      <ListItemText disableTypography>{item.text}</ListItemText>
    </ListItem>
  );
}
