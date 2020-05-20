import React, { useState } from 'react';
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
  OutlinedInput
} from '@material-ui/core';
import { vw } from '@/utils';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles(theme => ({
  wrap: {
    height: '100%',
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

const commentList = [
  {
    id: 0,
    name: '100***333',
    comment: '简直了还能这样子太强了吧李老师',
    time: new Date().toDateString(),
    img: require('assets/imgs/test_avatar.jpg')
  },
  {
    id: 1,
    name: '100***333',
    comment: '太好了，人美声甜形象生动通俗易懂，铭记历史勿忘苦难艰苦奋斗',
    time: new Date().toDateString(),
    img: require('assets/imgs/test_avatar.jpg')
  },
  {
    id: 2,
    name: '100***333',
    comment: '太好了，人美声甜形象生动通俗易懂，铭记历史勿忘苦难艰苦奋斗',
    time: new Date().toDateString(),
    img: require('assets/imgs/test_avatar.jpg')
  }
];
export default function MediaControlCard() {
  const classes = useStyles();
  const [tabVal, setTabVal] = useState(0);
  const theme = useTheme();
  return (
    <div className={classes.wrap}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.video}
          // src={require('assets/video/1.mp4')}
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
          <Tab label="详情" />
          <Tab label="聊天" />
          <Tab label="目录" />
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
              <Text size="large" text="课程名称xxx公开课"></Text>
              <Text text="讲师：李老 时间：2020/05/20"></Text>
              <Text text="其他"></Text>
              <Text text="观看人次520次"></Text>
            </Paper>
            <Paper className={classes.introduce} elevation={0}>
              <Text size="large" text="介绍" />
              <p style={{ marginTop: 6 }}>讲课题目：《论持久战》剖析</p>
              <p>{/* <Divider /> */}</p>
              <p>15：35-16：00 农村包围城市斗争战略 李老</p>
            </Paper>
            <Paper className={classes.model} elevation={0}>
              <Text size="large" text="讲师介绍"></Text>
              <Grid container justify="space-around">
                <Grid item xs={3}>
                  <Avatar
                    style={{ width: '100%', height: 'auto' }}
                    src={require('assets/imgs/test_avatar.jpg')}
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
                        text="李老师"
                      />
                    </Grid>
                    <Grid item>
                      <Text style={{ margin: 0 }} text="高级讲师 python组" />
                    </Grid>
                    <Grid item>
                      <Text style={{ margin: 0 }} text="广州绿地集团" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {/* 全部评论 */}
            <Paper
              className={classes.model}
              elevation={0}
              style={{ paddingBottom: '5vh' }}
            >
              <Text size="large" text="全部评论" />
              {commentList.map(item => (
                <Paper elevation={0} key={item.id} className={classes.comment}>
                  <Grid
                    container
                    justify="space-around"
                    alignItems="flex-start"
                    style={{ padding: 10 }}
                  >
                    <Grid item>
                      <Avatar src={item.img} />
                    </Grid>
                    <Grid item xs={10}>
                      <p
                        className={classes.sizeSmall}
                        style={{ marginTop: '0' }}
                      >
                        {item.name}
                      </p>
                      <p className={classes.sizeNormal}>{item.comment}</p>
                      <p className={classes.sizeSmall}>{item.time}</p>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Paper>
            <Paper elevation={4} className={classes.inputWrap}>
              <Grid container>
                <Grid item xs={10}>
                  <OutlinedInput
                    fullWidth
                    className={classes.input}
                    placeholder="说点什么吧"
                  />
                </Grid>
                <Grid item xs={2} className={classes.flexCenter}>
                  <Button>评论</Button>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>

          <TabPanel value={tabVal} index={1} dir={theme.direction}>
            <Paper elevation={0} className={classes.comment}>
              <Grid
                container
                justify="space-around"
                alignItems="flex-start"
                style={{ padding: 10 }}
              >
                <Grid item>
                  <Avatar src={require('assets/imgs/test_avatar.jpg')} />
                </Grid>
                <Grid item xs={10}>
                  <p className={classes.sizeSmall} style={{ marginTop: '0' }}>
                    100****2222
                  </p>
                  <p className={classes.sizeNormal}>
                    太好了，人美声甜形象生动通俗易懂，铭记历史勿忘苦难艰苦奋斗
                  </p>
                  <p className={classes.sizeSmall}>
                    {new Date().toDateString()}
                  </p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={0} className={classes.comment}>
              <Grid
                container
                justify="space-around"
                alignItems="flex-start"
                style={{ padding: 10 }}
              >
                <Grid item>
                  <Avatar src={require('assets/imgs/test_avatar.jpg')} />
                </Grid>
                <Grid item xs={10}>
                  <p className={classes.sizeSmall} style={{ marginTop: '0' }}>
                    100****2222
                  </p>
                  <p className={classes.sizeNormal}>
                    太好了，人美声甜形象生动通俗易懂，铭记历史勿忘苦难艰苦奋斗
                  </p>
                  <p className={classes.sizeSmall}>
                    {new Date().toDateString()}
                  </p>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
          <TabPanel value={tabVal} index={2} dir={theme.direction}>
            目录
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </div>
  );
}
