import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  TextField,
  IconButton,
  Typography,
  Hidden,
  Divider
} from '@material-ui/core';
import { vw, requestApi, getQueryKey } from '@/utils';
import SwipeableViews from 'react-swipeable-views';
import { useParams, withRouter } from 'react-router-dom';
import AppCont from 'container';
import BackHeader from '../components/BackHeader';
import { StarTwoTone } from '@material-ui/icons';
import useRunning from '@/hooks/useRunning';
import InfiniteScroll from 'react-infinite-scroller';
import { defaultAvatar } from 'configs';
import PCTemplate from '../components/PCTemplate';
import useWidth from '@/hooks/useWidth';
import Nav from '../components/Header/Nav';

const useStyles = makeStyles(theme => ({
  wrap: {
    height: 'calc(100% - 49px)',
    position: 'relative'
  },
  root: {
    display: 'flex'
  },
  video: {
    width: '100%',
    height: vw(420),
    maxHeight: 380
  },
  info: {
    marginTop: theme.spacing(3)
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  model: {
    padding: `${vw(15)} ${vw(22.5)}`,
    fontSize: 16,
    marginTop: theme.spacing(1)
  },
  introduce: {
    padding: `${vw(22.5)} ${vw(22.5)} ${vw(35)}`,
    fontSize: 14,
    marginTop: theme.spacing(1),
    lineHeight: 1.5,
    '& p': {
      margin: 4
    }
  },
  sizeSmall: {
    fontSize: 16,
    color: '#666'
  },
  sizeNormal: {
    lineHeight: 1.5
  },
  comment: {
    borderBottom: '1px solid #ccc',
    marginBottom: 4
  },
  inputWrap: {
    position: 'fixed',
    bottom: '0',
    left: 0,
    right: 0,
    background: '#fff',
    padding: theme.spacing(1, 0)
    // maxHeight: 49
  },
  input: {
    '& .MuiOutlinedInput-input': {
      // padding: vw(22.5)
    }
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  collected: {
    float: 'right'
  },
  textareaWrap: {
    marginBottom: 48,
    flexGrow: 1,
    boxSizing: 'border-box'
  },
  textarea: {
    padding: theme.spacing(1.2, 2),
    width: '90%',
    height: '90px',
    fontSize: '13px',
    border: '1px solid #eee',
    borderRadius: 4,
    backgroundColor: '#fafafa',
    resize: 'none',
    display: 'inline-block',
    verticalAlign: 'top',
    outlineStyle: 'none',
    overflow: 'auto',
    marginLeft: theme.spacing(1)
  },
  btn: {
    margin: theme.spacing(1),
    float: 'right'
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
    return props.size === 'large' ? 16 : 14;
  },
  fontWeight: props => {
    return props.size === 'large' ? 'bold' : '';
  },
  color: props => {
    return props.size === 'large' ? '#3f51b5' : '#888';
  }
});

export default withRouter(function MediaControlCard(props) {
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
    // setError('评论成功', 'success', 1000);
    setComments(state => ({
      ...state,
      results: state.results.concat([{ ...result, content: commentVal }])
    }));
    setCommentVal('');
  });

  const {
    video_url,
    comments_count,
    title,
    video_desc,
    video_long,
    user_info = {},
    collected,
    has_follow,
    is_followed
  } = videoInfo;
  const hasMore = comments.next;
  const width = useWidth();
  const scrollRef = useRef();
  return (
    <>
      {width === 'xs' ? (
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
      ) : (
        <Nav />
      )}
      <PCTemplate screen={width} ref={scrollRef}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={!!hasMore}
          loader={
            <div style={{ textAlign: 'center' }} key={'0dd'}>
              正在加载...
            </div>
          }
          useWindow={false}
          getScrollParent={() => scrollRef.current}
        >
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
            >
              <TabPanel
                value={tabVal}
                index={0}
                dir={theme.direction}
                style={{ background: '#f5f5f5' }}
              >
                <Paper className={classes.model} elevation={0}>
                  <Button
                    variant="outlined"
                    size="medium"
                    className={classes.collected}
                    onClick={clickStar}
                    color={collected ? 'secondary' : 'primary'}
                  >
                    {collected ? '已收藏' : '+收藏'}
                  </Button>
                  <Text size="large" text={title}></Text>
                  <Text text={video_desc}></Text>
                  <Text text={`视频时长：${video_long}`}></Text>
                </Paper>

                {/* 用户信息 */}
                <Paper className={classes.model} elevation={0}>
                  <Grid container justify="space-around">
                    {has_follow && (
                      <Grid
                        item
                        xs={12}
                        style={{ textAlign: 'right', marginBottom: -36 }}
                      >
                        {width === 'xs' ? (
                          <Typography
                            color="secondary"
                            variant="body2"
                            align="right"
                          >
                            <span onClick={clickFollow}>
                              {is_followed ? '取消关注' : '+关注'}
                            </span>
                          </Typography>
                        ) : (
                          <Button
                            variant="outlined"
                            size="medium"
                            color="primary"
                            onClick={clickFollow}
                          >
                            {is_followed ? '取消关注' : '+关注'}
                          </Button>
                        )}
                      </Grid>
                    )}
                    <Grid item xs={3}>
                      <Avatar
                        className={classes.avatar}
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
                            style={{
                              margin: 0,
                              color: '#000',
                              textDecoration: 'underline'
                            }}
                            size="large"
                            onClick={() =>
                              props.history.push('/user/' + user_info.user_id)
                            }
                            text={user_info.username}
                          />
                        </Grid>
                        <Grid item>
                          {
                            <Text
                              style={{ margin: 0 }}
                              text={`${user_info.company} ${user_info.departments} ${user_info.job}`}
                            />
                          }
                        </Grid>
                        <Grid item>
                          <Text
                            style={{ margin: 0 }}
                            text={
                              user_info.company + ' ' + user_info.departments
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>

                {/* 全部评论 */}
                <Paper
                  className={classes.model}
                  elevation={0}
                  style={{
                    marginBottom: 15
                  }}
                >
                  <div className={classes.textareaWrap}>
                    <textarea
                      className={classes.textarea}
                      placeholder="写下你的评论吧...."
                      value={commentVal}
                      onChange={e => setCommentVal(e.target.value)}
                    ></textarea>
                    <Button
                      size="small"
                      className={classes.btn}
                      variant="outlined"
                      onClick={() => setCommentVal('')}
                    >
                      取消
                    </Button>
                    <Button
                      size="small"
                      className={classes.btn}
                      color="primary"
                      variant="contained"
                      onClick={submitComment}
                    >
                      发布
                    </Button>
                  </div>
                  <Divider />
                  <Grid container justify="space-between">
                    <Text
                      size="large"
                      text={`全部评论${
                        comments_count > 0 ? ` (${comments_count})` : ''
                      }`}
                    />
                  </Grid>
                  {/* <div
                    ref={scrollRef}
                    style={{ height: '50vh', overflow: 'auto' }}
                  > */}
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
                  {/* </div> */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    没有更多啦
                  </Typography>
                </Paper>
              </TabPanel>
            </SwipeableViews>
            <Hidden smUp>
              <Paper elevation={4} className={classes.inputWrap}>
                <Grid container style={{ maxWidth: 1000, margin: 'auto' }}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      placeholder="说点什么吧"
                      value={commentVal}
                      size="small"
                      variant="outlined"
                      onChange={e => {
                        setCommentVal(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.flexCenter}>
                    <Button variant="outlined" onClick={submitComment}>
                      评论
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Hidden>
          </div>
        </InfiniteScroll>
      </PCTemplate>
    </>
  );
});
