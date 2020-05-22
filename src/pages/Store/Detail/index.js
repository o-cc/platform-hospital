import React from 'react';
import { Grid, styled, Divider, makeStyles, Button } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Swiper from 'react-id-swiper';
import { vw } from '@/utils';

const MyDiv = styled(({ color, ...other }) => <div {...other} />)({
  background: props =>
    props.color === 'red'
      ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: props =>
    props.color === 'red'
      ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
      : '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  width: '100vw',
  height: vw(650),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const useStyles = makeStyles(theme => ({
  info: {
    padding: vw(30),
    width: '100%',
    fontSize: vw(25),
    '& p': {
      marginTop: vw(10)
    }
  },
  integration: {
    color: '#ff1111'
  },
  real: {
    color: '#888',
    paddingLeft: vw(15)
  },
  btnWrap: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0
  },
  btn: {
    color: '#fff',
    background: 'linear-gradient(to right, #fe3d72, #ff2f05)'
  }
}));

export default () => {
  const classes = useStyles();
  let params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  };
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <BackHeader title="xxx商品" />
      <Grid item xs={12}>
        <Swiper {...params}>
          <MyDiv>Slide1</MyDiv>
          <MyDiv color="red">Slide2</MyDiv>
          <MyDiv>Slide3</MyDiv>
          <MyDiv color="red">Slide4</MyDiv>
        </Swiper>
      </Grid>
      <Grid item className={classes.info}>
        <Divider />
        <h4 style={{}}>惠来隆江猪脚焖鸡</h4>
        <p className={classes.integration}>
          <span style={{ fontSize: vw(40), fontWeight: 'bold' }}>900</span> 积分
          <span className={classes.real}>
            市场价: <del>199</del>
          </span>
        </p>
        <p>库存： 0</p>
      </Grid>
      <div className={classes.btnWrap}>
        <Button
          variant={'contained'}
          size="large"
          className={classes.btn}
          fullWidth
        >
          立即兑换
        </Button>
      </div>
    </Grid>
  );
};
