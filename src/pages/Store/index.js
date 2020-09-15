import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { flexAll } from '@/globalStyles';
import {
  Grid,
  CardMedia,
  IconButton,
  Divider,
  Hidden
} from '@material-ui/core';
import BackHeader from '../components/BackHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import { requestApi, getQueryKey } from '@/utils';
import { ArrowDownward } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import AppCont from 'container';
import InfiniteScroll from 'react-infinite-scroller';
import Detail from './Detail';
import PCTemplate from '../components/PCTemplate';
import useWidth from '@/hooks/useWidth';
import Nav from '../components/Header/Nav';

const useStyles = makeStyles(theme => ({
  root: {
    ...flexAll,
    flexDirection: 'column'
  },
  card: {
    margin: '3%'
  },
  media: {
    height: 140
  },
  warp: {
    width: '100%',
    flex: 1
  },
  smallTxt: {
    fontSize: 15
  },
  large: {
    fontSize: 20,
    paddingRight: theme.spacing(1)
  },
  iconBtn: {
    alignSelf: 'flex-end',
    transition: 'all 2s'
  }
}));

const Arrow = styled(({ sort, ...other }) => (
  <ArrowDownward {...other} fontSize="inherit" />
))(({ theme, sort }) => {
  let angle;
  if (sort) {
    angle = 180;
  } else {
    angle = 0;
  }
  return {
    transition: 'transform 0.3s',
    transform: `rotate(${angle}deg)`
  };
});

export default withRouter(function SimpleCard(props) {
  const classes = useStyles();
  const [sort, setSort] = useState(false);
  const [goods, setGoods] = useState({ results: [] });
  const { setError, setGoods: setGoodsCache } = AppCont.useContainer();
  const [showDetail, setShowDetail] = useState({ show: false });
  const scrollRef = useRef();
  const sortList = () => {
    setGoods(goods => ({
      ...goods,
      results: goods.results.sort((a, b) => {
        if (sort) return a.integral - b.integral;
        return b.integral - a.integral;
      })
    }));
  };

  useEffect(() => {
    let res = goods.results;
    setGoodsCache(
      res.reduce((prev, next) => {
        prev[next.id] = next;
        return prev;
      }, {})
    );
  }, [goods.results, setGoodsCache]);

  const getGoodsByPage = useCallback(
    async page => {
      let { result, error } = await requestApi('getGoods', { page });
      if (error) return setError();
      if (page) {
        setGoods(goods => ({
          ...goods,
          ...result,
          results: goods.results.concat(result.results)
        }));
      } else {
        setGoods(result);
      }
    },
    [setError]
  );
  useEffect(() => {
    getGoodsByPage();
  }, [getGoodsByPage]);

  const loadFunc = async () => {
    let page = getQueryKey('page', goods.next);
    getGoodsByPage(page);
  };
  const hasMore = goods.next;
  const width = useWidth();
  return (
    <div>
      <Hidden smUp>
        <BackHeader title="积分商城" />
      </Hidden>
      <Hidden xsDown>
        <Nav />
      </Hidden>

      <PCTemplate screen={width} height="auto">
        <Grid
          style={{ maxWidth: 1000, margin: 'auto' }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid container justify="space-between" alignItems="center">
            <Typography style={{ paddingLeft: 8 }}>
              {/* 我的积分： <span style={{ fontSize: 20 }}>900</span> */}
              商品列表：
            </Typography>
            <IconButton
              aria-label="delete"
              className={classes.iconBtn}
              onClick={() => {
                setSort(sort => !sort);
                sortList();
              }}
            >
              <Arrow sort={sort} />
            </IconButton>
          </Grid>

          <Divider />

          <Grid container ref={scrollRef}>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadFunc}
              hasMore={!!hasMore}
              loader={
                <div style={{ textAlign: 'center' }} key={0}>
                  正在加载...
                </div>
              }
              useWindow={false}
              getScrollParent={() => scrollRef.current}
            >
              <Grid container>
                {goods.results.map(item => (
                  <Grid item xs={6} key={item.id} sm={6}>
                    <Card
                      className={classes.card}
                      onClick={() => {
                        if (width !== 'xs') {
                          return props.history.push('/store/PC/' + item.id);
                        }
                        setShowDetail({ show: true, goodsItem: item });
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={
                            item.images[0] ||
                            require('assets/imgs/test_books.jpg')
                          }
                          title={item.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="h2"
                          >
                            {item.name}
                          </Typography>

                          <Typography component="span" color="secondary">
                            <span className={classes.large}>
                              {item.integral}
                            </span>
                            <span className={classes.smallTxt}>积分</span>
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle2"
                            color="textSecondary"
                          >
                            <span>市场价：</span>
                            {item.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          </Grid>

          {/* <Hidden smUp> */}
          <Detail
            showDetail={showDetail}
            getGoodsByPage={getGoodsByPage}
            onClose={() => setShowDetail(sta => ({ ...sta, show: false }))}
          />
          {/* </Hidden> */}
        </Grid>
      </PCTemplate>
    </div>
  );
});
