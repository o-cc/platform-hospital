import React from 'react';
import Swiper from 'react-id-swiper';
import { vw } from 'utils';
import { makeStyles } from '@material-ui/core/styles';
import 'swiper/css/swiper.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: vw(390),
    marginTop: theme.spacing(7),
    overflow: 'hidden'
  },
  swiperItem: {
    width: '100vw',
    height: vw(400),
    color: '#fff',
    background: `url(${require('assets/imgs/test.jpg')}) no-repeat center`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    // spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    getSwiper: obj => {
      console.log('xx', obj);
    },
    on: {
      slideChange: () => {
        console.log('change');
      }
    }
  };

  return (
    <div className={classes.root}>
      <Swiper {...params}>
        <div className={classes.swiperItem}>Slide 1</div>
        <div className={classes.swiperItem}>Slide 2</div>
        <div className={classes.swiperItem}>Slide 3</div>
        <div className={classes.swiperItem}>Slide 4</div>
        <div className={classes.swiperItem}>Slide 5</div>
      </Swiper>
    </div>
  );
};
