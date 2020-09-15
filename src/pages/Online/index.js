import React, { useState, useEffect, useRef } from 'react';
import PageTemplate from 'pages/components/PageTemplate';
import PCTemplate from '../components/PCTemplate';
import { requestApi, getQueryKey } from '@/utils';
import container from '@/container';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';

import {
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Hidden
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import useWidth from '@/hooks/useWidth';

const useStyles = makeStyles(t => ({
  root: {
    marginTop: 46,
    height: 'calc(100vh - 105px)',
    padding: t.spacing(2, 1),
    boxSizing: 'border-box',
    overflow: 'auto'
  },
  card: {
    maxWidth: 345,
    width: '100%',
    position: 'relative'
  },
  poster: {
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center'
  },
  title: {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  }
}));
export default () => {
  const { setError } = container.useContainer();
  const [lives, setLives] = useState({});
  const classes = useStyles();
  useEffect(() => {
    async function getLives() {
      let { result, error } = await requestApi('getLivesList');
      if (error) {
        return setError();
      }
      setLives(result);
    }
    getLives();
  }, [setError]);

  const loadFunc = async () => {
    const page = getQueryKey('page', lives.next);
    let { result, error } = await requestApi('getLivesList', {
      page
    });
    if (error) return setError(error);

    setLives(sta => {
      return {
        ...result,
        results: sta.results ? sta.results.concat(result.results) : []
      };
    });
  };

  const hasMore = lives.next;
  const liveList = lives.results;

  const toOnline = link => {
    window.location.href = link;
  };

  const screen = useWidth();
  const scrollRef = useRef();
  return (
    <PageTemplate>
      <PCTemplate>
        <div
          className={classes.root}
          ref={scrollRef}
          style={{ marginTop: screen === 'xs' ? undefined : 0 }}
        >
          <Hidden smDown>
            <Typography variant="subtitle1">热门直播</Typography>
          </Hidden>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={!!hasMore}
            loader={
              <div style={{ textAlign: 'center', marginTop: 10 }} key={0}>
                正在加载...
              </div>
            }
            useWindow={false}
            getScrollParent={() => scrollRef.current}
          >
            <Grid container spacing={2}>
              {liveList &&
                liveList.map((item, idx) => (
                  <Grid item xs={6} sm={4} key={idx}>
                    <Card
                      className={classes.card}
                      onClick={() => toOnline(item.url)}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="online poster"
                          height="110"
                          image={item.image}
                        />
                        <div className={classes.poster}>
                          <PlayCircleFilledWhiteRoundedIcon
                            style={{ fontSize: '4rem', color: '#fff' }}
                          />
                        </div>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="h2"
                            className={classes.title}
                          >
                            {item.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </InfiniteScroll>
        </div>
      </PCTemplate>
    </PageTemplate>
  );
};
