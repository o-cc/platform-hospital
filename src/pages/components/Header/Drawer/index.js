import React, { Fragment, useEffect } from 'react';
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
import { vw, requestApi } from 'utils';
import { withRouter } from 'react-router-dom';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import AppCont from 'container';

const useStyles = makeStyles(theme => ({
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
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

function getRouterType(type, index) {
  let res = '';
  switch (type) {
    case 'store':
      res = '/store';
      break;
    case 'other':
      res = '/other/' + index;
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
  const [state, setState] = React.useState({ left: false });
  const [subActive, setSubActive] = React.useState([]);
  const { setError } = AppCont.useContainer();
  const [menuData, setMenuData] = React.useState([]);

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

  useEffect(() => {
    async function getMenuData() {
      let { result, error } = await requestApi('getMenu');
      if (error) {
        return setError(error);
      }
      setMenuData(result);
      setSubActive(result.map(() => true));
    }
    getMenuData();
  }, [setError]);

  const clickMenu = (type, index) => {
    props.history && props.history.push(getRouterType(type, index));
    toggleDrawer('left', false)();
  };

  const clickTopMenu = idx => {
    setSubActive(tfs => {
      return tfs.map((tf, k) => {
        if (k === idx) return !tf;
        return tf;
      });
    });
  };

  const list = anchor => {
    const menu = menuData;
    return (
      <div className={classes.list} role="presentation">
        <List>
          <ListItem button>
            <ListItemText primary={'logo'} />
          </ListItem>
          {/* 首页 */}
          <ListItem button>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'首页'}
              onClick={() => {
                props.history && props.history.push('/');
                toggleDrawer(anchor, false)();
              }}
            />
          </ListItem>
          {/* 配置类 */}
          {menu.map((item, index) => (
            <Fragment key={index}>
              <ListItem button onClick={() => clickTopMenu(index)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {item.sub_categories.length > 0 && subActive[index] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              {item.sub_categories.map(sub => (
                <Collapse
                  in={subActive[index]}
                  timeout="auto"
                  unmountOnExit
                  key={sub.sub_id}
                >
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => {
                        clickMenu('other', sub.sub_id);
                      }}
                    >
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={sub.name} />
                    </ListItem>
                  </List>
                </Collapse>
              ))}
            </Fragment>
          ))}
        </List>
        <Divider />

        <ListItem
          button
          key="login"
          onClick={() => props.history.push('/login')}
        >
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
  };

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
