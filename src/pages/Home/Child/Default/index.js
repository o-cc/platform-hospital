import React from 'react';
import Swiper from 'react-id-swiper';
import { makeStyles, styled } from '@material-ui/core/styles';
import 'swiper/css/swiper.css';
import Recommend from './Child/Recommend';
import ListsWithTitle from './Child/ListsWithTitle';
import { homeTestData } from 'pages/Home/helper';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(7),
    '& .swiper-button-next, & .swiper-button-prev': {
      color: '#fff'
    },
    '& .swiper-pagination-bullet-active': {
      background: '#fff'
    }
  }
}));

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
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

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
    <div className={classes.root}>
      <Swiper {...params}>
        <MyDiv>Slide1</MyDiv>
        <MyDiv>Slide2</MyDiv>
        <MyDiv>Slide3</MyDiv>
        <MyDiv>Slide4</MyDiv>
      </Swiper>

      {/* 热门推荐 */}
      <Recommend />

      {/* 信息面板 */}
      {homeTestData.map((item, idx) => (
        <ListsWithTitle listItem={item} key={idx} />
      ))}
    </div>
  );
};
