import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import { Inbox } from '@material-ui/icons';
import Address from '@/pages/components/Address';
import History from './components/History';
import MyArticle from './components/MyArticle/';
import BackHeader from 'pages/components/BackHeader';
import { withRouter } from 'react-router-dom';
import Info from './components/PersonInfo';
import { requestApi } from '@/utils';
import AppCont from 'container';
import Exchange from './components/Order';
import Followers from './components/Followers';
import { defaultAvatar } from 'configs';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  topAta: {
    borderBottom: '8px solid #f8f8f8',
    padding: theme.spacing(3)
  },
  padding2: {
    padding: theme.spacing(2)
  },
  item: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    color: '#333',
    fontSize: theme.spacing(2)
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  large: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subtitle: {
    marginLeft: -15
  },
  iconWrap: {
    position: 'fixed',
    bottom: '6%',
    right: '2%'
  },
  icon: {
    width: '72px!important',
    height: '72px!important'
  },
  arrow: {
    color: '#888',
    fontSize: 16
  },
  payment: {
    color: 'orange',
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 4
  }
}));

const types = {
  address: 'address',
  exchange: 'exchange',
  task: 'task',
  myArticle: 'myArticle',
  record: 'record',
  info: 'info',
  followers: 'followers'
};

const menuList = [
  { id: 0, title: '收货地址', type: types.address },
  { id: 1, title: '兑换记录', type: types['exchange'] },
  { id: 2, title: '任务中心', type: types['task'] },
  { id: 3, title: '我的文章', type: types['myArticle'] },
  { id: 4, title: '浏览记录', type: types['record'] }
];

export default withRouter(props => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const { setError } = AppCont.useContainer();
  const toggleDrawer = item => {
    setModal(item.type || '');
  };

  useEffect(() => {
    async function getUser() {
      let { result, error } = await requestApi('getUserInfo');
      if (error) return setError(error);
      setUserInfo(result);
      console.log(result);
    }
    getUser();
  }, [setError]);

  const onClose = () => {
    setModal(false);
  };

  const clickFollows = async e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(1);
    toggleDrawer({ type: types.followers });
    // let { result } = await requestApi('getFans', { user_id: userInfo.user_id });
    // console.log(result);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <BackHeader withoutHome={true} title="" />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.topAta}
          onClick={() => setModal(types.info)}
        >
          <Grid item xs={3}>
            <Avatar
              src={userInfo.avatar || defaultAvatar}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">{userInfo.username}</Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
              <Button size="small" onClick={clickFollows}>
                关注{userInfo.follows}
              </Button>
              <Button size="small">粉丝{userInfo.fans}</Button>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <ArrowForwardIosIcon className={classes.arrow} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.padding2}
          >
            <Grid item>
              <Grid container alignItems="center">
                <PaymentIcon className={classes.payment} />
                <Typography variant="subtitle2">
                  我的积分：<span className={classes.large}>0.00</span>
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    style={{ marginRight: 5 }}
                  >
                    签到
                  </Typography>
                </Grid>
                <Grid item>
                  <ArrowForwardIosIcon className={classes.arrow} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        {menuList.map(list => (
          <Grid item xs={12} key={list.type}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.item}
              onClick={() => toggleDrawer(list)}
            >
              <Grid item>
                <Typography>{list.title}</Typography>
              </Grid>
              <Grid item>
                <ArrowForwardIosIcon className={classes.arrow} />
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        ))}
      </Grid>

      <IconButton
        color="secondary"
        aria-label="add an alarm"
        className={classes.iconWrap}
        onClick={() => {
          setDrawer(true);
        }}
      >
        <AddCircleIcon className={classes.icon} />
      </IconButton>
      <Drawer anchor={'bottom'} open={drawer} onClose={() => setDrawer(false)}>
        <div style={{ paddingBottom: 16 }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={'写文章'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={'写病例'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Info
        open={modal === types.info}
        userInfo={userInfo}
        setUserInfo={info => setUserInfo(info)}
        onClose={onClose}
      />
      <Address open={modal === types.address} onClose={onClose} />
      <History open={modal === types.record} onClose={onClose} />
      <MyArticle open={modal === types.myArticle} onClose={onClose} />
      <Exchange open={modal === types.exchange} onClose={onClose} />
      <Followers open={modal === types.followers} onClose={onClose} />
    </Grid>
  );
});
