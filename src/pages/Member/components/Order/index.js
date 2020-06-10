import React, { useEffect, useCallback, useState, useRef } from 'react';
import Slider from 'pages/components/Slider';
import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { requestApi, getQueryKey } from '@/utils';
import AppCont from 'container';
import InfiniteScroll from 'react-infinite-scroller';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '90vh',
    overflowY: 'auto'
  },
  img: {
    maxWidth: '100%',
    height: 'auto'
  },
  paper: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 0, 0),
    '& .span': {
      color: '#f30'
    }
  },
  info: {
    height: '100%',
    paddingLeft: theme.spacing(1)
  }
}));
export default props => {
  const classes = useStyles();
  const [orders, setOrders] = useState({ results: [] });
  const { setError } = AppCont.useContainer();
  const ScrollRef = useRef(null);

  const getOrders = useCallback(
    async page => {
      let { result, error } = await requestApi('getOrders', { page });
      if (error) return setError(error);
      console.log(result);
      if (page) {
        setOrders(orders => ({
          ...result,
          results: orders.results.concat(result.results)
        }));
      } else {
        setOrders(result);
      }
    },
    [setError]
  );
  useEffect(() => {
    if (props.open) {
      getOrders();
    }
  }, [getOrders, props.open]);

  const loadFunc = async () => {
    const page = getQueryKey('page', orders.next);
    await getOrders(page);
  };

  const hasMore = orders.next;

  return (
    <Slider open={props.open}>
      <BackHeader back={props.onClose} title="订单中心" />

      <div
        style={{ height: 'calc(98vh - 49px)', overflow: 'auto' }}
        ref={ScrollRef}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={!!hasMore}
          useWindow={false}
          getScrollParent={() => ScrollRef.current}
          loader={
            <div style={{ textAlign: 'center' }} key={0}>
              正在加载...
            </div>
          }
        >
          {orders.results.map(item => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <Paper variant="outlined" className={classes.paper}>
                <Typography variant="subtitle2" color="textSecondary">
                  交易时间：<span className="span">{item.create_time}</span>
                </Typography>
                <Grid container className={classes.order}>
                  <Grid item xs={4}>
                    <img
                      src={item.image}
                      alt="商品图"
                      className={classes.img}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid
                      container
                      justify="space-around"
                      className={classes.info}
                    >
                      <Grid item xs={12}>
                        <Grid
                          container
                          alignItems="center"
                          justify="space-between"
                        >
                          <Grid item>{item.good}</Grid>
                          <Grid item>
                            <Typography variant="body2" color="textPrimary">
                              x {item.count}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          container
                          alignItems="center"
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography variant="body2" color="textPrimary">
                              <span className="span">积分: {item.cost}</span>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="secondary">
                              {item.status}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
          {!hasMore && (
            <Typography align="center" variant="body2" color="textSecondary">
              没有更多啦
            </Typography>
          )}
        </InfiniteScroll>
      </div>
    </Slider>
  );
};
