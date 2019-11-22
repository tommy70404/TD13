import React, { useState } from 'react';
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
import clsx from 'clsx';

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
      width: 240,
    },
    listItem: {
      padding: theme.spacing(1),
      color: 'white',
      textDecoration: 'none',
      '& p:link': {
        textDecoration: 'none',
      },
      '&:hover': {},
    },
    nested: {
      paddingLeft: 62,
    },
  }),
  { name: 'PageWrapper' },
);

const menu = [
  {
    text: '護單管理',
    target: '/maintenance',
    icon: <AssignmentIndRounded color="inherit" />,
    subMenu: [
      {
        text: '新增 / 修改維護單',
        target: '/maintenance',
        subMenu: [],
      },
      {
        text: '查詢維護單',
        target: '/maintenance',
        subMenu: [],
      },
    ],
  },
  {
    text: 'TD 管理',
    target: '/td',
    icon: <ViewListRounded color="inherit" />,
    subMenu: [],
  },
  {
    text: '廠商管理',
    target: '/vendor',
    icon: <HomeWorkRounded color="inherit" />,
    subMenu: [],
  },
  {
    text: '材料管理',
    target: 'material',
    icon: <SettingsApplicationsRounded color="inherit" />,
    subMenu: [],
  },
];

export const PageWrapper = ({ title }: IPageWrapperProps) => {
  const [state, setstate] = useState({ menu: false });
  const classes = useStyles();

  // const sideList = () => (
  //   <div className={classes.list}>
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Box padding="0px 32px">
          <Grid container alignItems="center">
            <IconButton onClick={() => setstate(prev => ({ ...prev, menu: !prev.menu }))}>
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
          {item.icon && <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>}
          <ListItemText>{item.text}</ListItemText>
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
      {item.icon && <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>}
      <ListItemText>{item.text}</ListItemText>
    </ListItem>
  );
}
