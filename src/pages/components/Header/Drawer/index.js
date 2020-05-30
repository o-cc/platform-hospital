import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { isIOS } from 'utils';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { vw } from 'utils';
import { withRouter } from 'react-router-dom';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  iconButton: {
    padding: 10,
    fontSize: vw(18),
    color: 'white'
  }
});

function getRouterType(type) {
  let res = '';
  switch (type) {
    case 'store':
      res = '/store';
      break;
    case 'video':
      res = '/other/video';
      break;
    case 'books':
      res = '/other/books';
      break;
    case 'case':
      res = '/other/case';
      break;
    case 'home':
      res = '/';
      break;
    default:
      res = '/';
      break;
  }
  return res;
}

function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const clickMenu = (item, index) => {
    props.history && props.history.push(getRouterType(item.type));
  };

  const list = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary={'logo'} />
        </ListItem>
        <ListItem button onClick={() => clickMenu({ type: 'home' })}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'首页'} />
        </ListItem>
        {props.menuData.map((item, index) => (
          <ListItem button key={index} onClick={() => clickMenu(item, index)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <ListItem button key="login" onClick={() => props.history.push('/login')}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={'登录'} />
      </ListItem>

      <ListItem
        button
        key="member"
        onClick={() => props.history.push('/member/2')}
      >
        <ListItemIcon>
          <PermContactCalendarOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={'个人中心'} />
      </ListItem>
    </div>
  );

  const anchor = 'left';
  return (
    <>
      <IconButton
        className={classes.iconButton}
        onClick={toggleDrawer(anchor, true)}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        disableBackdropTransition={!isIOS()}
        disableDiscovery={isIOS()}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </>
  );
}

SwipeableTemporaryDrawer.defaultProps = {
  menuData: []
};

export default withRouter(SwipeableTemporaryDrawer);
