import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Avatar,
  Button,
  Hidden
} from '@material-ui/core';
import { requestApi, getQueryKey } from '@/utils';
import AppCont from 'container';
import InfiniteScroll from 'react-infinite-scroller';
import { defaultAvatar } from '@/configs';
import useRunning from '@/hooks/useRunning';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 49px)',

    '&>div': {
      width: '100%'
    }
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
  },
  line: {
    width: 660,
    height: 1,
    background: '#ccc',
    marginBottom: 16
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
        user_id: props.userId,
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
    [props.userId, props.type, setError]
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

  const hasMore = lists.next;
  const results = lists.results || [];

  return (
    <>
      <Hidden xsDown>
        <Typography
          variant="body1"
          color="textSecondary"
          align="left"
          style={{ paddingLeft: 30 }}
        >
          我的{props.type === 'followers' ? '关注' : '粉丝'}
        </Typography>
        <div className={classes.line}></div>
      </Hidden>
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
          {results.length > 0 ? (
            <Grid container justify="center">
              {results.map(item => (
                <Grid key={item.id} item xs={12} sm={11}>
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
                              variant={
                                item.is_follow ? 'outlined' : 'contained'
                              }
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
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              没有更多啦
            </Typography>
          )}
        </InfiniteScroll>
      </Grid>
    </>
  );
};
