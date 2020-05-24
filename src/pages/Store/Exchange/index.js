import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Divider,
  Paper,
  Typography
} from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Slider from '@/pages/components/Slider';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { vw } from '@/utils';
import { addressList as testList } from 'configs/test_data';
import AddressItem from 'pages/components/Address/Child/item';

import Add from './Child/add';
const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${vw(15)} ${vw(22.5)}`,
    color: '#778'
  },
  img: {
    width: '90%',
    height: 'auto',
    maxWidth: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  confirm: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0
  },
  pay: {
    borderRadius: 20
  }
}));

export default () => {
  const classes = useStyles();
  const [addressModal, setAddressModal] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});
  useEffect(() => {
    let list = testList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].is_default) {
        setDefaultAddress(list[i]);
        break;
      }
    }
  }, []);
  return (
    <div style={{ width: '100%', height: '100%', background: '#f8f8f8' }}>
      <Grid container>
        <BackHeader title="商品兑换" />

        {defaultAddress.is_default ? (
          <AddressItem
            addressItem={defaultAddress}
            hasLocation={true}
            click={() => setAddressModal(true)}
          />
        ) : (
          <Grid item xs={12}>
            <Button
              variant="text"
              className={classes.button}
              endIcon={<ArrowForwardIosRoundedIcon />}
              onClick={() => setAddressModal(true)}
            >
              选择收货地址
            </Button>
            <Divider />
          </Grid>
        )}

        <Paper variant="outlined" className={classes.paper}>
          <Grid container>
            <Grid item xs={4}>
              <img
                src={require('assets/imgs/test_books.jpg')}
                className={classes.img}
                alt=""
              />
            </Grid>
            <Grid item xs={8}>
              <Grid
                container
                direction="column"
                justify="space-between"
                style={{ height: '100%' }}
              >
                <Grid item>荣氏复古料理隆江猪脚饭</Grid>
                <Grid item>
                  <Grid container justify="space-between">
                    <Typography>1900积分</Typography>
                    <Typography align="right">x 1</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper variant="outlined" className={classes.confirm}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: 8 }}
          >
            <Grid item style={{ fontSize: 15 }}>
              合计：<span style={{ color: 'red' }}>1900积分</span>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                className={classes.pay}
              >
                确认支付
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {/* 添加地址 */}
        <Slider open={addressModal} bgColor="#f8f8f8">
          <Add onClose={() => setAddressModal(false)} />
        </Slider>
      </Grid>
    </div>
  );
};
