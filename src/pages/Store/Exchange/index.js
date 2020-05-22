import React, { useState } from 'react';
import { Grid, Button, makeStyles, Divider } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Slider from '@/pages/components/Slider';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { vw } from '@/utils';
import Add from './Child/add';
const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${vw(15)} ${vw(22.5)}`,
    color: '#778'
  }
}));

export default () => {
  const classes = useStyles();
  const [addressModal, setAddressModal] = useState(false);
  return (
    <Grid container>
      <BackHeader title="商品兑换" />
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
      {/* 地址 */}
      <Slider open={addressModal}>
        <Add onClose={() => setAddressModal(false)} />
      </Slider>
    </Grid>
  );
};
