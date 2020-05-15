import React, { useState } from 'react';
import { Grid, Button, Divider, IconButton } from '@material-ui/core';
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
    marginTop: theme.spacing(8),
    fontFamily: 'Microsoft Yahei',
    fontSize: vw(30),
    color: '#000000',
    lineHeight: '25px',
    paddingBottom: theme.spacing(6)
  },
  date: {
    alignSelf: 'flex-start',
    fontSize: vw(20),
    textAlign: 'left',
    marginLeft: theme.spacing(2.5),
    margin: theme.spacing(-1)
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
  }
}));

const Img = styled(({ src, ...other }) => (
  <img src={src} alt="图片" {...other} />
))({
  width: '100%',
  height: 'auto',
  marginTop: vw(38)
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
        <Grid item className={classes.date}>
          2020年05月20日
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
