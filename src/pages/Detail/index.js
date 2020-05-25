import React, { useState } from 'react';
import {
  Grid,
  Button,
  Divider,
  Link,
  Avatar,
  Typography
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Comment from 'pages/Home/components/Comment';
import { vw } from '@/utils';
import { test_html } from 'configs/test_detail_html';
import { withRouter } from 'react-router-dom';
import InputComment from 'pages/Home/components/InputComment';
import Back from 'pages/components/BackHeader';

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
    paddingBottom: theme.spacing(1)
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

const Img = styled(({ src, ...other }) => (
  <img src={src} alt="图片" {...other} />
))({
  width: '100%',
  height: 'auto'
});

function Detail(props) {
  const classes = useStyles();
  const [like, setLike] = useState(false);
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
            微软改进Windows 10 v2004细节：整体游戏性能加强 支持光线追踪1.1
          </Typography>
        </Grid>
        <Grid
          item
          className={classes.date}
          style={{ paddingTop: 0, paddingBottom: 0 }}
          onClick={() => props.history.push('/user/1')}
        >
          <div className={classes.avatar}>
            <Avatar alt="avatar" src={require('assets/imgs/test_avatar.jpg')} />
            <Grid style={{ marginLeft: 8 }} container direction="column">
              <span className="user">胖虎西西</span>
              <Grid item className="date">
                2020/05/20
              </Grid>
            </Grid>
          </div>
          <Link
            href="#"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            +关注
          </Link>
        </Grid>
        <Grid item xs={11}>
          <Img src={require('assets/imgs/detail.jpeg')} />
        </Grid>

        <Grid item xs={11}>
          <div
            dangerouslySetInnerHTML={{ __html: test_html }}
            className={classes.normalText}
          ></div>
        </Grid>

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
      </Grid>
      <Divider />
      <Comment />
      {/* 评论文章 */}
      <InputComment
        onRelease={val => {
          console.log('评论文章：', val);
        }}
      />
    </>
  );
}

export default withRouter(Detail);
