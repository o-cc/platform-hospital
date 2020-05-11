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
import AppCont from 'container';
import { vw } from 'utils';

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

export default function SwipeableTemporaryDrawer(props) {
  const appCont = AppCont.useContainer();
  const { menuLists } = appCont.state;

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
    item.type = item.type === 'home' ? '' : item.type;
    props.history && props.history.replace(`/${item.type}`);
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
        {menuLists.map((item, index) => (
          <ListItem button key={index} onClick={() => clickMenu(item, index)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
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
