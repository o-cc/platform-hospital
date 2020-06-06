import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Avatar,
  styled,
  Button
} from '@material-ui/core';
import { vw, requestApi, keepPoint } from 'utils';
import TopNav from 'pages/components/TopNav';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tabs from '@/pages/User/Tabs';
import { useParams } from 'react-router-dom';
import AppCont from 'container';
import { defaultAvatar } from 'configs';

const useStyles = makeStyles(theme => ({
  back: {
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1)
  },
  info: {
    // width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontFamily: 'Microsoft Yahei',
    fontSize: vw(25),
    color: '#000000',
    lineHeight: vw(35)
  },
  avatar: {
    width: '90%',
    height: 'auto'
  },
  introduce: {
    paddingLeft: theme.spacing(1)
  },
  bold: {
    color: '#000',
    fontWeight: '600',
    fontSize: vw(30)
  },
  small: {
    color: '#888',
    fontSize: vw(25)
  }
}));

const Btn = styled(({ isAttention, ...other }) => (
  <Button size="small" {...other} variant="outlined"></Button>
))({
  marginTop: vw(20),
  color: props => (props.isAttention ? '#666' : '#fff'),
  width: '90%'
});

const FlexColumn = styled(({ ...other }) => <div {...other}></div>)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: vw(7.5)
});
export default props => {
  const classes = useStyles();
  const { id: userId } = useParams();
  const { setError } = AppCont.useContainer();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getAuthor() {
      let { result, error } = await requestApi('getAuthorInfo', {
        author_id: userId
      });
      if (error) return setError(error);
      setUserInfo(result);
    }

    getAuthor();
  }, [userId, setError]);

  const attention = async () => {
    let { error } = await requestApi('postFollowed', { user_id: userId });
    if (error) return setError(error);
    setUserInfo(sta => ({
      ...sta,
      is_followed: !sta.is_followed
    }));
  };
  return (
    <>
      <TopNav title={userInfo.author} unDivider={false} />
      <Paper variant="outlined" className={classes.info}>
        <Grid container justify="center">
          <Grid item xs={3}>
            <Avatar
              className={classes.avatar}
              alt="avatar"
              src={userInfo.avatar || defaultAvatar}
            />
          </Grid>
          <Grid item xs={8}>
            <FlexColumn>
              <Grid container justify="space-around">
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>
                      {keepPoint(userInfo.news_count, 4)}
                    </span>
                    <span className={classes.small}>文章</span>
                  </FlexColumn>
                </Grid>
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>
                      {keepPoint(userInfo.followers_count, 4)}
                    </span>
                    <span className={classes.small}>关注</span>
                  </FlexColumn>
                </Grid>
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>
                      {keepPoint(userInfo.fans_count, 4)}
                    </span>
                    <span className={classes.small}>粉丝</span>
                  </FlexColumn>
                </Grid>
                {userInfo.like_count && (
                  <Grid item>
                    <FlexColumn>
                      <span className={classes.bold}>
                        {userInfo.like_count}
                        {keepPoint(userInfo.fans_count, 4)}
                      </span>
                      <span className={classes.small}>获赞</span>
                    </FlexColumn>
                  </Grid>
                )}
              </Grid>
            </FlexColumn>
            {userInfo.has_follow && (
              <Grid item style={{ textAlign: 'center' }}>
                <Btn
                  isAttention={userInfo.is_followed}
                  style={{
                    background: userInfo.is_followed ? '#fff' : '#f85a5b'
                  }}
                  onClick={attention}
                >
                  {userInfo.is_followed ? '已关注' : '关注'}
                </Btn>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={11}>
            <Grid
              container
              alignItems="flex-start"
              style={{ paddingTop: vw(15) }}
            >
              <Grid item>
                <AssignmentIcon
                  size="small"
                  style={{ color: '#555', marginLeft: '8px' }}
                />
              </Grid>
              <Grid item xs={10}>
                <div className={classes.introduce}>{userInfo.intro}</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Tabs userId={userId} setError={setError} />
    </>
  );
};
