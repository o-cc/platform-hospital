import React, { useState } from 'react';
import {
  Grid,
  Button,
  Divider,
  Link,
  Avatar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Comment from 'pages/components/Comment';
import { vw, requestApi, getQueryByKey } from '@/utils';
import { withRouter } from 'react-router-dom';
import InputComment from 'pages/components/InputComment';
import Back from 'pages/components/BackHeader';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppCont from 'container';
import { format } from 'date-fns';
import { defaultAvatar } from 'configs';
import InfiniteScroll from 'react-infinite-scroller';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Microsoft Yahei',
    fontSize: vw(30),
    color: '#000000',
    lineHeight: '25px',
    paddingBottom: theme.spacing(6)
  },
  date: {
    alignSelf: 'center',
    fontSize: vw(25),
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
    lineHeight: '25px',
    '& img': {
      maxWidth: '100%!important',
      height: 'auto!important'
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
  }
}));

function Detail(props) {
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState({});
  const [comments, setComments] = useState([]);
  const { setError } = AppCont.useContainer();

  useEffect(() => {
    async function getDetailAndComment() {
      const { result, error } = await requestApi('getNewsDetail', {
        news_id: id
      });
      console.log('result', result);
      if (error) {
        return setError(error);
      }
      setDetailInfo(result);

      const { result: commentRes, error: commentErr } = await requestApi(
        'getDetailComments',
        {
          news_id: id
        }
      );
      console.log('comment', commentRes);

      if (commentErr) return setError(commentErr);
      setComments(commentRes);
    }

    getDetailAndComment();
  }, [id, setError]);

  const attention = () => {
    alert('关注');
  };

  const loadFunc = async () => {
    //知道文章的id、next
    let next = comments.next;
    let page = getQueryByKey('page', next);
    let { result, error } = await requestApi('getDetailComments', {
      news_id: id,
      page
    });
    if (error) return setError(error);
    console.log(result);
  };

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

  return (
    <>
      <Grid
        container
        className={classes.root}
        justify="center"
        direction="column"
        alignItems="center"
      >
        <Back title="" />
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
          onClick={() => props.history.push('/user/1')}
        >
          <div className={classes.avatar}>
            <Avatar alt="avatar" src={user_info.avatar || defaultAvatar} />
            <Grid style={{ marginLeft: 8 }} container direction="column">
              <span className="user">{user_info.username}</span>
              <Grid item className="date">
                {create_time && format(new Date(create_time), 'yyyy-MM-dd')}
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
              {is_followed ? '已关注' : '+关注'}
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
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={hasMore ? true : false}
        loader={
          <div style={{ textAlign: 'center' }} key={0}>
            正在加载...
          </div>
        }
      >
        <Comment comments={comments} />
      </InfiniteScroll>
      {/* 评论文章 */}
      <InputComment
        count={comments_count}
        collected={collected}
        onCollect={() => {
          alert('收藏');
          setDetailInfo(state => ({ ...state, collected: !state.collected }));
        }}
        onRelease={val => {
          console.log('评论文章：', val);
        }}
      />
    </>
  );
}

export default withRouter(Detail);
