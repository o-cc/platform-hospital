import React, { useState } from 'react';
import {
  Grid,
  Button,
  Divider,
  IconButton,
  Link,
  Avatar
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Comment from 'pages/Home/components/Comment';
import { vw } from '@/utils';
import { test_html } from 'configs/test_detail_html';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from 'react-router-dom';
import InputComment from 'pages/Home/components/InputComment';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
    fontFamily: 'Microsoft Yahei',
    fontSize: vw(30),
    color: '#000000',
    lineHeight: '25px',
    paddingBottom: theme.spacing(6)
  },
  date: {
    alignSelf: 'center',
    fontSize: vw(20),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%'
  },
  normalText: {
    color: '#333',
    fontSize: theme.spacing(2),
    fontFamily: 'arial',
    paddingBottom: theme.spacing(1)
    // letterSpacing: theme.spacing(0.15)
  },
  button: {
    color: 'red'
  },
  back: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing(3),
    width: '100%'
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
  // marginTop: vw(38)
});

function Detail(props) {
  const classes = useStyles();
  const [like, setLike] = useState(false);
  return (
    <>
      <Grid
        container
        className={classes.root}
        spacing={3}
        justify="center"
        direction="column"
        alignItems="center"
      >
        <Grid item xs={11} className={classes.back} style={{ padding: 0 }}>
          <IconButton onClick={() => props.history.go && props.history.go(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
          <Divider />
        </Grid>
        <Grid item xs={11}>
          微软改进Windows 10 v2004细节：整体游戏性能加强 支持光线追踪1.1
        </Grid>
        <Grid
          item
          className={classes.date}
          style={{ paddingTop: 0, paddingBottom: 0 }}
          onClick={() => props.history.push('/user/user_id=1')}
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
