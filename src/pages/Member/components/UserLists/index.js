import React, { useEffect, useState, useRef, useCallback } from 'react';
import Slider from 'pages/components/Slider';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Avatar,
  Button
} from '@material-ui/core';
import BackHeader from '@/pages/components/BackHeader';
import { requestApi, getQueryKey } from '@/utils';
import AppCont from 'container';
import InfiniteScroll from 'react-infinite-scroller';
import { defaultAvatar } from '@/configs';
import useRunning from '@/hooks/useRunning';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 49px)',
    overflowX: 'hidden'
  },
  img: {
    width: theme.spacing(9),
    height: theme.spacing(9)
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
  const [lists, setLists] = useState([]);
  const { setError } = AppCont.useContainer();
  const scrollRef = useRef(null);

  const getFollowers = useCallback(
    async page => {
      const apiName =
        props.type === 'followers' ? 'getFollowPeople' : 'getFans';
      let { result, error } = await requestApi(apiName, {
        user_id: props.user_id,
        page
      });
      if (error) return setError(error);
      if (page) {
        setLists(list => ({
          ...result,
          results: list.results.concat(result.results)
        }));
      } else {
        setLists(result);
      }
    },
    [props.user_id, props.type, setError]
  );

  useEffect(() => {
    if (props.type) {
      getFollowers();
    }
  }, [getFollowers, props.type]);

  const loadFunc = async () => {
    const page = getQueryKey('page', lists.next);
    await getFollowers(page);
  };

  const followEvent = useRunning(async user_id => {
    console.log('userId', user_id);
  });

  const type = props.type;
  const hasMore = lists.next;
  const results = lists.results || [];

  return (
    <Slider open={props.open}>
      <BackHeader
        back={props.onClose}
        title={type === 'followers' ? '我的关注' : '我的粉丝'}
      />
      <Grid container justify="center" ref={scrollRef} className={classes.root}>
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
          <Grid
            container
            justify="center"
            spacing={1}
            style={{ width: '100vw' }}
          >
            {results.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Paper variant="elevation" className={classes.paper}>
                  <Grid container>
                    <Grid item xs={3}>
                      <Avatar
                        src={item.avatar || defaultAvatar}
                        className={classes.img}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        container
                        justify="space-around"
                        className={classes.info}
                      >
                        <Grid item xs={12}>
                          {item.username}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            {item.job}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            粉丝数：{item.fans_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {item.hasFollowed && (
                      <Grid item xs={3}>
                        <Grid
                          container
                          style={{ width: '100%', height: '100%' }}
                          justify="center"
                          alignItems="center"
                        >
                          <Button
                            size="small"
                            onClick={() => followEvent(item.user_id)}
                            variant={item.is_follow ? 'outlined' : 'contained'}
                            color={item.is_follow ? 'default' : 'secondary'}
                          >
                            {item.is_follow ? '取消关注' : '关注'}
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Grid>
    </Slider>
  );
};
