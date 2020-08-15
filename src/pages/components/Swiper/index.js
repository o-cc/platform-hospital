import React from 'react';
import { vw } from 'utils';
import Swiper from 'react-id-swiper';
import { makeStyles, styled } from '@material-ui/core/styles';
import { defaultSwiper } from 'configs';
import Recommend from 'pages/Home/Child/Recommend';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .swiper-button-next, & .swiper-button-prev': {
      color: '#fff'
    },
    '& .swiper-pagination-bullet-active': {
      background: '#fff'
    }
  }
}));

const MyDiv = styled(({ ...other }) => <div {...other} />)({
  background: ({ image }) =>
    `url(${image || defaultSwiper}) no-repeat center/100% 100%`,
  border: 0,
  color: 'white',
  width: '100vw',
  height: vw(350),
  maxHeight: '450px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  paddingBottom: '10px'
});

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

export default ({ swiperList = [], commendList = [], ...props }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Swiper {...params}>
          {swiperList.map(item => (
            <MyDiv
              key={item.content_id}
              image={item.image}
              onClick={() => {
                if (item.url) window.location.href = item.url;
              }}
            >
              {item.title}
            </MyDiv>
          ))}
        </Swiper>
      </div>
      <Recommend list={commendList} />
    </>
  );
};
