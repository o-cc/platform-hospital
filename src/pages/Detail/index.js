import React, { useState, useCallback, useRef } from 'react';
import {
  Grid,
  Button,
  Divider,
  Link,
  Avatar,
  Typography,
  Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Comment from 'pages/Detail/Comment';
import { requestApi, getQueryKey } from '@/utils';
import { withRouter } from 'react-router-dom';
import InputComment from '@/pages/Detail/InputComment';
import Back from 'pages/components/BackHeader';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppCont from 'container';
import { defaultAvatar } from 'configs';
import InfiniteScroll from 'react-infinite-scroller';
import useRunning from '@/hooks/useRunning';
import Dialog from 'pages/components/Dialog';
import PCTemplate from '../components/PCTemplate';
import Nav from '../components/Header/Nav';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Microsoft Yahei',
    fontSize: 16,
    color: '#000000',
    maxWidth: 1000,
    margin: 'auto',
    lineHeight: '25px',
    paddingBottom: theme.spacing(6)
  },

  outer: {
    width: '100%',
    height: '100%'
  },
  date: {
    alignSelf: 'center',
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    margin: `${20}px 0`
  },
  normalText: {
    color: '#333',
    fontSize: theme.spacing(2),
    fontFamily: 'arial',
    paddingBottom: theme.spacing(1),
    '& img': {
      maxWidth: '100%!important',
      height: 'auto!important'
    },
    '& h1': {
      lineHeight: 1.3
    }
  },
  button: {
    color: 'red'
  },
  author: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingTop: 0,
    paddingBottom: 0
  },
  avatar: {
    display: 'flex',
    lineHeight: '20px',

    '& .user': {
      fontWeight: 'bold'
    },
    '& .date': {
      color: '#888'
    }
  },
  sectionComment: {
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
    '& .textareaWrap': {
      marginBottom: 48,
      flexGrow: 1,
      boxSizing: 'border-box'
    },
    '& .textarea': {
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
    }
  },
  btn: {
    margin: theme.spacing(1),
    float: 'right'
  }
}));

function Detail(props) {
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState({ userInfo: {} });
  const [comments, setComments] = useState({});
  const { setError } = AppCont.useContainer();
  const [dialog, setDialog] = useState({ show: false, info: {} });
  const [inputVal, setInputVal] = useState('');

  const getArticleDetail = useCallback(async () => {
    const { result, error } = await requestApi('getNewsDetail', {
      news_id: id
    });
    if (error) {
      return setError(error);
    }
    setDetailInfo(result);
  }, [id, setError]);
  useEffect(() => {
    async function getDetailAndComment() {
      await getArticleDetail();
      const { result: commentRes, error: commentErr } = await requestApi(
        'getDetailComments',
        {
          news_id: id
        }
      );

      if (commentErr) return setError(commentErr);
      setComments(commentRes);
    }

    getDetailAndComment();
  }, [id, setError, getArticleDetail]);

  const attention = async () => {
    const { result, error } = await requestApi('postFollowed', {
      user_id: detailInfo.user_info.user_id
    });
    if (error) return setError(error);
    setDetailInfo(state => {
      return {
        ...state,
        is_followed: result.is_followed
      };
    });
  };

  const loadFunc = async () => {
    //知道文章的id、next
    let next = comments.next;
    let page = getQueryKey('page', next);
    console.log(page);
    let { result, error } = await requestApi('getDetailComments', {
      news_id: id,
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

  const onCollect = useRunning(async () => {
    let { result, error } = await requestApi('postCollections', {
      news_id: id
    });
    if (error) return setError(error);
    setDetailInfo(state => ({ ...state, collected: result.collected }));
  });

  //评论文章
  const onRelease = useRunning(async val => {
    if (!val) return setError('评论内容不能为空噢.', 'warning');
    let { result, error } = await requestApi('postComment', {
      content: val,
      news_id: id
    });
    if (error) return setError(error);
    setComments(state => ({
      ...state,
      results: state.results.concat([result])
    }));
    await getArticleDetail();
  });

  const favorite = useRunning(async list => {
    const comment_id = list.id;
    let { result, error } = await requestApi('putLikeComment', {
      news_id: id,
      comment_id
    });
    if (error) {
      return setError(error);
    }

    setComments(comments => {
      return {
        ...comments,
        results: comments.results.map(item => {
          if (item.id === list.id) {
            return {
              ...item,
              ...result
            };
          }
          return item;
        })
      };
    });
  });

  const deleteComment = useRunning(async () => {
    let comment = dialog.info;
    let { error } = await requestApi('deleteComment', {
      news_id: id,
      comment_id: comment.id
    });
    setDialog(state => ({ ...state, show: false }));
    if (error) {
      return setError(error);
    }

    setComments(comments => ({
      ...comments,
      results: comments.results.filter(item => item.id !== comment.id)
    }));
  });

  const {
    title,
    create_time,
    user_info = {},
    content = '',
    has_follow,
    is_followed,
    is_like,
    comments_count,
    collected
  } = detailInfo;
  const hasMore = comments.next;
  const scrollRef = useRef();
  return (
    <div className={classes.outer}>
      <Hidden smUp>
        <Back title="" />
      </Hidden>
      <Hidden xsDown>
        <Nav />
      </Hidden>
      <PCTemplate
        ref={scrollRef}
        renderSide={() => (
          <div
            className={classes.avatar}
            onClick={() => props.history.push('/user/' + user_info.user_id)}
          >
            <Avatar alt="avatar" src={user_info.avatar || defaultAvatar} />
            <Grid
              style={{ marginLeft: 8, lineHeight: 1.3 }}
              container
              direction="column"
            >
              <span className="user">{user_info.username}</span>
              <Grid item className="date">
                {create_time && create_time}
              </Grid>
            </Grid>
          </div>
        )}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={!!hasMore}
          loader={
            <div style={{ textAlign: 'center', marginBottom: 20 }} key={0}>
              正在加载...
            </div>
          }
          useWindow={false}
          getScrollParent={() => scrollRef.current}
        >
          <Grid
            container
            className={classes.root}
            justify="center"
            direction="column"
            alignItems="center"
          >
            <Grid item xs={11}>
              <Typography
                variant="subtitle1"
                style={{ marginTop: 10, fontWeight: 'bold' }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.date}
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <div
                className={classes.avatar}
                onClick={() => props.history.push('/user/' + user_info.user_id)}
              >
                <Avatar alt="avatar" src={user_info.avatar || defaultAvatar} />
                <Grid
                  style={{ marginLeft: 8, lineHeight: 1.3 }}
                  container
                  direction="column"
                >
                  <span className="user">{user_info.username}</span>
                  <Grid item className="date">
                    {create_time && create_time}
                  </Grid>
                </Grid>
              </div>
              {has_follow && (
                <Link
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    attention();
                  }}
                >
                  {is_followed ? '取消关注' : '+关注'}
                </Link>
              )}
            </Grid>

            <Grid item xs={11}>
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className={classes.normalText}
              ></div>
            </Grid>
            {is_like && (
              <Grid item xs={11}>
                <Button
                  variant="outlined"
                  size="large"
                  className={like ? classes.button : ''}
                  onClick={() => {
                    setLike(true);
                  }}
                  startIcon={<FavoriteBorderOutlinedIcon />}
                >
                  点赞
                </Button>
              </Grid>
            )}
          </Grid>
          <Divider />

          <Hidden xsDown>
            <div>
              <section className={classes.sectionComment}>
                <Grid container>
                  <Avatar
                    alt="avatar"
                    src={user_info.avatar || defaultAvatar}
                  />
                  <div className="textareaWrap">
                    <textarea
                      className="textarea"
                      placeholder="写下你的评论吧...."
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                    ></textarea>
                    <Button
                      size="small"
                      className={classes.btn}
                      variant="outlined"
                      onClick={() => setInputVal('')}
                    >
                      取消
                    </Button>
                    <Button
                      size="small"
                      className={classes.btn}
                      color="primary"
                      variant="contained"
                      onClick={async () => {
                        await onRelease(inputVal);
                        setInputVal('');
                      }}
                    >
                      发布
                    </Button>
                  </div>
                </Grid>
                <Divider />
              </section>
              <Typography variant="subtitle1" style={{ paddingLeft: 16 }}>
                全部评论
              </Typography>
            </div>
          </Hidden>

          <Comment
            comments={comments}
            hasMore={!!hasMore}
            favorite={favorite}
            deleteComment={comment => setDialog({ show: true, info: comment })}
          />

          <Hidden smUp>
            {/* 评论文章 */}
            <InputComment
              count={comments_count}
              collected={collected}
              onCollect={onCollect}
              onRelease={onRelease}
            />
          </Hidden>
          <Dialog
            text="删除评论后无法恢复噢"
            handleOk={deleteComment}
            open={dialog.show}
            onClose={() => setDialog(stat => ({ ...stat, show: false }))}
          ></Dialog>
        </InfiniteScroll>
      </PCTemplate>
    </div>
  );
}

export default withRouter(Detail);
