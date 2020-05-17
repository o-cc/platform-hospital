import React from 'react';
import {
  Grid,
  makeStyles,
  Paper,
  Avatar,
  styled,
  Button
} from '@material-ui/core';
import { vw } from 'utils';
import TopNav from 'pages/components/TopNav';
import AssignmentIcon from '@material-ui/icons/Assignment';
const useStyles = makeStyles(theme => ({
  back: {
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1)
  },
  info: {
    width: '100%',
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

const Btn = styled(({ ...other }) => <Button size="small" {...other}></Button>)(
  {
    marginTop: vw(20),
    color: '#fff',
    width: '90%',
    backgroundColor: '#f85a5b'
  }
);

const FlexColumn = styled(({ ...other }) => <div {...other}></div>)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: vw(7.5)
});
export default props => {
  const classes = useStyles();

  return (
    <>
      <TopNav title="你的名字是" unDivider={false} />
      <Paper variant="outlined" className={classes.info}>
        <Grid container justify="center">
          <Grid item xs={3}>
            <Avatar
              className={classes.avatar}
              alt="avatar"
              src={require('assets/imgs/test_avatar.jpg')}
            />
          </Grid>
          <Grid item xs={8}>
            <FlexColumn>
              <Grid container justify="space-around">
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>8.9万</span>
                    <span className={classes.small}>关注</span>
                  </FlexColumn>
                </Grid>
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>8.9万</span>
                    <span className={classes.small}>关注</span>
                  </FlexColumn>
                </Grid>
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>8.9万</span>
                    <span className={classes.small}>关注</span>
                  </FlexColumn>
                </Grid>
                <Grid item>
                  <FlexColumn>
                    <span className={classes.bold}>8.9万</span>
                    <span className={classes.small}>关注</span>
                  </FlexColumn>
                </Grid>
              </Grid>
            </FlexColumn>
            <Grid item style={{ textAlign: 'center' }}>
              <Btn>关注</Btn>
            </Grid>
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
                <div className={classes.introduce}>
                  简介：广东财经研究院副院长，职业操盘手，专业研究道指二十年从未失手，号称国内第一股神'九菲特'
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
