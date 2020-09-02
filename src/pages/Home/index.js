import React, { useEffect, useState } from 'react';
import PageTemplate from 'pages/components/PageTemplate';
import { requestApi, formatArray2Obj } from 'utils';
import AppCont from 'container';
import { makeStyles } from '@material-ui/core/styles';
import 'swiper/css/swiper.css';
import ListsWithTitle from './Child/ListsWithTitle';
import Loading from 'pages/components/Loading';
import SwiperWrap from 'pages/components/Swiper';
import useWidth from '@/hooks/useWidth';
import PCTemplate from 'pages/components/PCTemplate';

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // maxWidth: '1000px',
    // padding: theme.spacing(0, 2),
    // margin: 'auto',
    marginTop: theme.spacing(6),
    minHeight: 'calc(100vh - 105px)'
  }
}));

export default props => {
  const appCont = AppCont.useContainer();
  const { setError, setHomeData } = appCont;
  const classes = useStyles();
  const [homeData, setHome] = useState({ contents: [], news: [] });
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
      setHome(result);
    }

    getHomeInfo();
  }, [setError, setHomeData]);

  const { contents, news } = homeData;
  const { contents: swiperList = [] } =
    formatArray2Obj(contents)['index-banner'] || {};
  const { contents: commendList = [] } =
    formatArray2Obj(contents)['index-list'] || {};
  const width = useWidth();

  function swiperProps(commendList) {
    if (width === 'xs') {
      return {
        height: undefined,
        commendList
      };
    } else {
      return {
        height: 280,
        commendList: []
      };
    }
  }
  return (
    <PageTemplate>
      {loading ? (
        <Loading />
      ) : (
        <div className={width !== 'xs' ? '' : classes.root}>
          <PCTemplate withoutBg={true} screen={width} commendList={commendList}>
            <SwiperWrap swiperList={swiperList} {...swiperProps(commendList)} />

            {/* 信息面板 */}
            {news.map((item, idx) => (
              <ListsWithTitle listItem={item} key={item.id} />
            ))}
          </PCTemplate>
        </div>
      )}
    </PageTemplate>
  );
};
