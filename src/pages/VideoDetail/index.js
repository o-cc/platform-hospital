import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import {
  CardMedia,
  Card,
  Paper,
  Tabs,
  Tab,
  Grid,
  Avatar,
  Button,
  OutlinedInput,
  IconButton,
  Typography
} from '@material-ui/core';
import { vw, requestApi, getQueryKey } from '@/utils';
import SwipeableViews from 'react-swipeable-views';
import { useParams } from 'react-router-dom';
import AppCont from 'container';
import BackHeader from '../components/BackHeader';
import { StarTwoTone } from '@material-ui/icons';
import useRunning from '@/hooks/useRunning';
import InfiniteScroll from 'react-infinite-scroller';
import { defaultAvatar } from 'configs';

const useStyles = makeStyles(theme => ({
  wrap: {
    height: 'calc(100% - 49px)',
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    display: 'flex'
  },
  video: {
    width: '100vw',
    height: vw(420)
  },
  info: {
    marginTop: theme.spacing(3)
  },
  tabWrap: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  model: {
    padding: `${vw(15)} ${vw(22.5)}`,
    fontSize: vw(30),
    marginTop: theme.spacing(1)
  },
  introduce: {
    padding: `${vw(22.5)} ${vw(22.5)} ${vw(35)}`,
    fontSize: vw(25),
    marginTop: theme.spacing(1),
    lineHeight: 1.5,
    '& p': {
      margin: 4
    }
  },
  sizeSmall: {
    fontSize: vw(23),
    color: '#666'
  },
  sizeNormal: {
    lineHeight: vw(45)
  },
  comment: {
    borderBottom: '1px solid #ccc',
    marginBottom: 4
  },
  inputWrap: {
    position: 'absolute',
    bottom: '0',
    left: 0,
    right: 0,
    background: '#fff',
    padding: `${vw(7.5)} 0`
  },
  input: {
    '& .MuiOutlinedInput-input': {
      padding: vw(22.5)
    }
  },
  views: {
    '& .react-swipeable-view-container': {
      height: '100%'
    }
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Text = styled(({ text, ...other }) => <p {...other}>{text}</p>)({
  fontSize: props => {
    return props.size === 'large' ? vw(30) : vw(25);
  },
  fontWeight: props => {
    return props.size === 'large' ? 'bold' : '';
  },
  color: props => {
    return props.size === 'large' ? '#3f51b5' : '#888';
  }
});

export default function MediaControlCard() {
  const classes = useStyles();
  const [tabVal, setTabVal] = useState(0);
  const theme = useTheme();
  const { id: news_id } = useParams();
  const [videoInfo, setVideoInfo] = useState({});
  const { setError } = AppCont.useContainer();
  const [comments, setComments] = useState({ results: [] });
  const [commentVal, setCommentVal] = useState('');
  useEffect(() => {
    async function getVideoById() {
      let { result, error } = await requestApi('getNewsDetail', { news_id });
      if (error) return setError(error);
      setVideoInfo(result);
      console.log('result', result);
    }
    getVideoById();
  }, [setError, news_id]);
  //获取评论列表
  const getComments = useCallback(
    async (page = 1) => {
      let { result, error } = await requestApi('getDetailComments', {
        news_id
      });
      if (error) return setError(error);
      setComments(result);
      console.log('comment', result);
    },
    [setError, news_id]
  );
  useEffect(() => {
    getComments();
  }, [getComments]);

  const clickStar = useRunning(async () => {
    let { error } = await requestApi('postCollections', { news_id });
    if (error) return setError(error);
    setVideoInfo(state => ({
      ...state,
      collected: !state.collected
    }));
  });

  const clickFollow = useRunning(async () => {
    if (!videoInfo.user_info || !videoInfo.user_info.user_id) return;
    const user_id = videoInfo.user_info.user_id;
    let { error } = await requestApi('postFollowed', { user_id });
    if (error) return setError(error);
    setVideoInfo(state => ({
      ...state,
      is_followed: !state.is_followed
    }));
  });

  const loadFunc = async () => {
    //知道文章的id、next
    let next = comments.next;
    console.log(next);
    let page = getQueryKey('page', next);

    let { result, error } = await requestApi('getDetailComments', {
      news_id,
      page
    });
    if (error) return setError(error);
    setComments(state => {
      return {
        ...state,
        ...result,
        results: state.results.concat(result.results)
      };
    });
  };

  const submitComment = useRunning(async () => {
    if (!commentVal.trim()) return;

    let { result, error } = await requestApi('postComment', {
      news_id,
      content: commentVal
    });
    if (error) return setError(error);
    setError('评论成功', 'success', 1000);
    console.log(result);
    setComments(state => ({
      ...state,
      results: state.results.concat([{ ...result, content: commentVal }])
    }));
  });

  const {
    video_url,
    comment_count,
    title,
    video_desc,
    video_long,
    user_info = {},
    collected,
    has_follow,
    is_followed
  } = videoInfo;
  const hasMore = comments.next;
  console.log(!!hasMore);
  return (
    <>
      <BackHeader
        title={title}
        homeComponent={() => (
          <IconButton
            onClick={clickStar}
            color={collected ? 'secondary' : 'default'}
            aria-label="collect"
            component="span"
          >
            <StarTwoTone />
          </IconButton>
        )}
      />
      <div className={classes.wrap}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.video}
            src={video_url}
            title="Live from space album cover"
            component="video"
            controls="controls"
            preload="true"
            playsInline={true}
            x5-video-player-type="h5-page"
            webkit-playsinline="true"
          />
        </Card>
        <Paper className={classes.tabWrap}>
          <Tabs
            value={tabVal}
            onChange={(e, val) => {
              setTabVal(val);
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="视频详情" />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={tabVal}
            onChangeIndex={idx => setTabVal(idx)}
            style={{ flex: 1, height: '50vh' }}
            className={classes.views}
          >
            <TabPanel
              value={tabVal}
              index={0}
              dir={theme.direction}
              style={{ background: '#f5f5f5' }}
            >
              <Paper className={classes.model} elevation={0}>
                <Text size="large" text={title}></Text>
                <Text text={video_desc}></Text>
                <Text text={`视频时长：${video_long}`}></Text>
              </Paper>

              <Paper className={classes.model} elevation={0}>
                <Grid container justify="space-around">
                  {has_follow && (
                    <Grid item xs={12}>
                      <Typography
                        color="secondary"
                        variant="body2"
                        align="right"
                      >
                        <span onClick={clickFollow}>
                          {is_followed ? '取消关注' : '+关注'}
                        </span>
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={3}>
                    <Avatar
                      style={{ width: '100%', height: 'auto' }}
                      src={user_info.avatar || defaultAvatar}
                    ></Avatar>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid
                      container
                      direction="column"
                      style={{ height: '100%' }}
                      justify="space-around"
                    >
                      <Grid item>
                        <Text
                          style={{ margin: 0, color: '#000' }}
                          size="large"
                          text={user_info.username}
                        />
                      </Grid>
                      <Grid item>
                        {user_info.intro && (
                          <Text style={{ margin: 0 }} text={user_info.intro} />
                        )}
                      </Grid>
                      <Grid item>
                        <Text
                          style={{ margin: 0 }}
                          text={user_info.company + ' ' + user_info.departments}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              {/* 全部评论 */}

              <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={!!hasMore}
                loader={
                  <div style={{ textAlign: 'center' }} key={0}>
                    正在加载...
                  </div>
                }
                style={{ overflow: 'auto', height: '50vh' }}
              >
                <Paper
                  className={classes.model}
                  elevation={0}
                  style={{ paddingBottom: '8vh' }}
                >
                  <Grid container justify="space-between">
                    <Text size="large" text="全部评论" />
                    {comment_count ? (
                      <Text
                        size="small"
                        text={`+${comment_count}`}
                        style={{ color: '#f30' }}
                      />
                    ) : null}
                  </Grid>

                  {comments.results.map(item => (
                    <Paper
                      elevation={0}
                      key={item.id}
                      className={classes.comment}
                    >
                      <Grid
                        container
                        justify="space-around"
                        alignItems="flex-start"
                        style={{ padding: 10 }}
                      >
                        <Grid item>
                          <Avatar src={item.avatar || defaultAvatar} />
                        </Grid>
                        <Grid item xs={10}>
                          <p
                            className={classes.sizeSmall}
                            style={{ marginTop: '0' }}
                          >
                            {item.username}
                          </p>
                          <p className={classes.sizeNormal}>{item.content}</p>
                          <p className={classes.sizeSmall}>
                            {item.create_time}
                          </p>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    已经到底啦
                  </Typography>
                </Paper>
              </InfiniteScroll>
              <Paper elevation={4} className={classes.inputWrap}>
                <Grid container>
                  <Grid item xs={10}>
                    <OutlinedInput
                      fullWidth
                      className={classes.input}
                      placeholder="说点什么吧"
                      value={commentVal}
                      onChange={e => {
                        setCommentVal(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.flexCenter}>
                    <Button onClick={submitComment}>评论</Button>
                  </Grid>
                </Grid>
              </Paper>
            </TabPanel>
          </SwipeableViews>
        </Paper>
      </div>
    </>
  );
}
