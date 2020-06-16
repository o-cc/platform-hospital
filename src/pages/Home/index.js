import React, { useEffect, useState } from 'react';
import PageTemplate from 'pages/components/PageTemplate';
import { requestApi, vw } from 'utils';
import AppCont from 'container';
import Swiper from 'react-id-swiper';
import { makeStyles, styled } from '@material-ui/core/styles';
import 'swiper/css/swiper.css';
import Recommend from './Child/Recommend';
import ListsWithTitle from './Child/ListsWithTitle';
import Loading from 'pages/components/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(7),
    minHeight: 'calc(100vh - 100px)',
    '& .swiper-button-next, & .swiper-button-prev': {
      color: '#fff'
    },
    '& .swiper-pagination-bullet-active': {
      background: '#fff'
    }
  }
}));

const MyDiv = styled(({ ...other }) => <div {...other} />)({
  background: ({ image }) => `url(${image}) no-repeat center/auto 100%`,
  border: 0,
  color: 'white',
  width: '100vw',
  height: vw(350),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end'
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

function formatArray2Obj(contents) {
  return contents.reduce((prev, next) => {
    prev[next.key] = next;
    return prev;
  }, {});
}
export default props => {
  const appCont = AppCont.useContainer();
  const { setError } = appCont;
  const classes = useStyles();
  const [homeData, setHomeData] = useState({ contents: [], news: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getHomeInfo() {
      let { result, error } = await requestApi('getHomeData');

      setTimeout(() => {
        setLoading(false);
      }, 100);
      if (error) {
        return setError(error);
      }
      setHomeData(result);
    }

    getHomeInfo();
  }, [setError]);

  const { contents, news } = homeData;
  const { contents: swiperList = [] } =
    formatArray2Obj(contents)['index-banner'] || {};
  const { contents: commendList = [] } =
    formatArray2Obj(contents)['index-list'] || {};

  return (
    <PageTemplate>
      {loading ? (
        <Loading />
      ) : (
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
          {/* 热门推荐 */}
          <Recommend list={commendList} />

          {/* 信息面板 */}
          {news.map((item, idx) => (
            <ListsWithTitle listItem={item} key={item.id} />
          ))}
        </div>
      )}
    </PageTemplate>
  );
};
