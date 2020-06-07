import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { flexAll } from '@/globalStyles';
import { Grid, CardMedia, IconButton, Divider } from '@material-ui/core';
import BackHeader from '../components/BackHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import { requestApi, getQueryKey } from '@/utils';
import { ArrowDownward } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import AppCont from 'container';
import InfiniteScroll from 'react-infinite-scroller';
import Detail from './Detail';

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
  const { setError } = AppCont.useContainer();
  const [showDetail, setShowDetail] = useState({ show: false });
  const sortList = () => {
    setGoods(goods => ({
      ...goods,
      results: goods.results.sort((a, b) => {
        if (sort) return a.integral - b.integral;
        return b.integral - a.integral;
      })
    }));
  };

  const getGoodsByPage = useCallback(
    async page => {
      let { result, error } = await requestApi('getGoods', { page });
      if (error) return setError();
      console.log(result);
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

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <BackHeader title="积分商城" />
      <Grid container justify="space-between" alignItems="center">
        <Typography style={{ color: 'red', paddingLeft: 8 }}>
          {/* 我的积分： <span style={{ fontSize: 20 }}>900</span> */}
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

      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={!!hasMore}
        loader={
          <div style={{ textAlign: 'center' }} key={0}>
            正在加载...
          </div>
        }
      >
        <Divider />
        <Grid container style={{ maxHeight: '81vh', overflow: 'auto' }}>
          {goods.results.map(item => (
            <Grid item xs={6} key={item.id} sm={4} md={3}>
              <Card
                className={classes.card}
                onClick={() => {
                  setShowDetail({ show: true, goodsItem: item });
                }}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.images[0]}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                      {item.name}
                    </Typography>

                    <Typography component="span" color="secondary">
                      <span className={classes.large}>{item.integral}</span>
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

      <Detail
        showDetail={showDetail}
        getGoodsByPage={getGoodsByPage}
        onClose={() => setShowDetail(sta => ({ ...sta, show: false }))}
      />
    </Grid>
  );
});
