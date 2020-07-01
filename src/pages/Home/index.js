import React, { useEffect, useState } from 'react';
import PageTemplate from 'pages/components/PageTemplate';
import { requestApi } from 'utils';
import AppCont from 'container';
import { makeStyles } from '@material-ui/core/styles';
import 'swiper/css/swiper.css';
import Recommend from './Child/Recommend';
import ListsWithTitle from './Child/ListsWithTitle';
import Loading from 'pages/components/Loading';
import SwiperWrap from 'pages/components/Swiper';
import useWidth from '@/hooks/useWidth';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '1300px',
    margin: 'auto',
    marginTop: theme.spacing(7),
    minHeight: 'calc(100vh - 100px)'
  }
}));

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

  const width = useWidth();
  return (
    <PageTemplate>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={classes.root}
          style={{ marginTop: width === 'xs' ? undefined : '82px' }}
        >
          <SwiperWrap swiperList={swiperList} />
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
