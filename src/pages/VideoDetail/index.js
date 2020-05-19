import React, { useState } from 'react';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import {
  CardMedia,
  Card,
  Paper,
  Tabs,
  Tab,
  Grid,
  Avatar
} from '@material-ui/core';
import { vw } from '@/utils';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles(theme => ({
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
    flexGrow: 1
  },
  model: {
    padding: `${vw(15)} ${vw(22.5)}`,
    fontSize: vw(30),
    marginTop: theme.spacing(1)
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
      style={{ overflowY: 'hidden' }}
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
  return (
    <>
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
        >
          <TabPanel
            value={tabVal}
            index={0}
            dir={theme.direction}
            style={{ background: '#f5f5f5' }}
          >
            <Paper className={classes.model} elevation={0}>
              <Text size="large" text="课程名称xxx公开课"></Text>
              <Text text="讲师：李老师 时间：2020/05/20"></Text>
              <Text text="其他">其他</Text>
              <Text text="观看人次520次"></Text>
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
            <Paper className={classes.model} elevation={0}>
              <Text size="large" text="评论"></Text>
            </Paper>
          </TabPanel>
          <TabPanel value={tabVal} index={1} dir={theme.direction}>
            聊天
          </TabPanel>
          <TabPanel value={tabVal} index={2} dir={theme.direction}>
            目录
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </>
  );
}
