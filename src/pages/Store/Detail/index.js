import React, { useState } from 'react';
import { Grid, styled, Divider, makeStyles, Button } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import Swiper from 'react-id-swiper';
import { vw } from '@/utils';
import { withRouter } from 'react-router-dom';
import Slider from 'pages/components/Slider';
import Exchange from '../Exchange';
const MyDiv = styled(({ src, ...other }) => (
  <img src={src} alt="商品介绍" {...other} />
))({
  color: 'white',
  maxWidth: '100%',
  height: 'auto'
});

const useStyles = makeStyles(theme => ({
  info: {
    padding: vw(30),
    fontSize: 15,
    maxWidth: 1000,
    margin: 'auto',
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

export default withRouter(props => {
  const classes = useStyles();
  const [showExchange, setExchange] = useState(false);
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

  const { show, goodsItem = {} } = props.showDetail || {};
  return (
    <Slider open={show}>
      <Grid container justify="center" alignItems="center">
        <BackHeader title={goodsItem.name} back={props.onClose} />
        <Grid item xs={12} md={6} style={{ padding: 8 }}>
          <Swiper {...params}>
            {goodsItem.images &&
              goodsItem.images.map((item, idx) => (
                <MyDiv key={idx} src={item} />
              ))}
          </Swiper>
        </Grid>
        <Grid item xs={12} className={classes.info}>
          <Divider />
          <h4>{goodsItem.name}</h4>
          <p className={classes.integration}>
            <span style={{ fontSize: 20, fontWeight: 'bold' }}>
              {goodsItem.integral}
            </span>{' '}
            积分
            <span className={classes.real}>
              市场价: <del>{goodsItem.price}</del>
            </span>
          </p>
          <p>库存： {goodsItem.stock}</p>
          <p>{goodsItem.desc}</p>
        </Grid>
        <div className={classes.btnWrap}>
          <Button
            variant={'contained'}
            size="large"
            className={classes.btn}
            fullWidth
            onClick={() => {
              setExchange(true);
            }}
          >
            立即兑换
          </Button>
        </div>
      </Grid>

      <Exchange
        open={showExchange}
        goodsItem={goodsItem}
        onClose={() => setExchange(false)}
        successExchange={async () => {
          setExchange(false);
          props.onClose();
          props.getGoodsByPage && (await props.getGoodsByPage());
        }}
      />
    </Slider>
  );
});
