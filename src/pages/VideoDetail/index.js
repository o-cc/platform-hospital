import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CardMedia, Card, Paper, Tabs, Tab } from '@material-ui/core';
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
          <TabPanel value={tabVal} index={0} dir={theme.direction}>
            详情
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
