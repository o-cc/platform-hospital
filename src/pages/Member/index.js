import React, { useState } from 'react';
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
import History from './Child/History';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  topAta: {
    borderBottom: '6px solid #f8f8f8',
    padding: theme.spacing(3)
  },
  padding2: {
    padding: theme.spacing(2)
  },
  item: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
    width: theme.spacing(9),
    height: theme.spacing(9)
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

// const menuList = [{ id: 0, text: '收货地址', type: 'address' }];

export default () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);


  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.topAta}
          onClick={() => console.log('去主页')}
        >
          <Grid item xs={3}>
            <Avatar
              src={require('assets/imgs/test_avatar.jpg')}
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">single male</Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
              <Button size="small">关注0</Button>
              <Button size="small">粉丝0</Button>
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
                    赚积分
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

        <Grid item xs={12}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.item}
          >
            <Grid item>
              <Typography>收货地址</Typography>
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon className={classes.arrow} />
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.item}
          >
            <Grid item>
              <Typography>兑换记录</Typography>
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon className={classes.arrow} />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.item}
          >
            <Grid item>
              <Typography>任务中心</Typography>
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon className={classes.arrow} />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.item}
          >
            <Grid item>
              <Typography>审核中心</Typography>
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon className={classes.arrow} />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.item}
          >
            <Grid item>
              <Typography>浏览历史</Typography>
            </Grid>
            <Grid item>
              <ArrowForwardIosIcon className={classes.arrow} />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
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

      <Address open={addressModal} onClose={() => setAddressModal(false)} />
      <History open={historyModal} onClose={() => setHistoryModal(false)} />
    </Grid>
  );
};
