import React, { useState } from 'react';
import Slider from 'pages/components/Slider';
import BackHeader from '@/pages/components/BackHeader';
import {
  Tabs,
  Tab,
  Grid,
  Typography,
  Divider,
  IconButton,
  Button
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { format } from 'date-fns';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

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
      {value === index && props.children}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  panel: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1)
  },
  panelItem: {
    marginTop: theme.spacing(2)
  },
  release: {
    fontSize: 16,
    color: '#f90'
  }
}));
const articleList = [
  {
    id: 0,
    title: '大鹏展翅',
    date: format(new Date(), 'yyyy-MM-dd HH:mm')
  },
  { id: 1, title: '大鹏展翅2', date: format(new Date(), 'yyyy-MM-dd HH:mm') }
];

export default props => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const classes = useStyles();
  const [detailModal, setDetailModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Slider open={props.open}>
      <BackHeader back={props.onClose} title="我的文章" withoutHome={true} />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label="公开文章" {...{ ...a11yProps(0) }} />
        <Tab label="草稿箱" {...{ ...a11yProps(1) }} />
      </Tabs>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container className={classes.panel}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                2篇文章
              </Typography>
            </Grid>

            {articleList.map(item => (
              <Grid
                item
                xs={12}
                className={classes.panelItem}
                key={item.id}
                onClick={() => {
                  setDetailModal(true);
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                      未公开 最后更新时间 {item.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" style={{ minHeight: 50 }}>
                      {item.title}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Divider />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container className={classes.panel}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                2篇文章
              </Typography>
            </Grid>

            {articleList.map(item => (
              <Grid
                item
                xs={12}
                className={classes.panelItem}
                key={item.id}
                onClick={() => {
                  //切换到预览文本
                  setDetailModal(true);
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                      未公开 最后更新时间 {item.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" style={{ minHeight: 50 }}>
                      {item.title}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Divider />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </SwipeableViews>

      <Slider open={detailModal}>
        <BackHeader
          back={() => setDetailModal(false)}
          title=""
          homeComponent={() => (
            <IconButton className={classes.release}>发布</IconButton>
          )}
        />
        <div
          style={{
            padding: 8,
            height: 'calc(100vh - 106px)',
            overflow: 'auto'
          }}
        >
          <h1>你总说 时间还很多</h1>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
          <p>你知道我在等你吗 你还在那里等着我？你的钱包还会带着钱吗</p>
        </div>
        <Button fullWidth variant="contained" size="large" color="secondary">
          编辑
        </Button>
      </Slider>
    </Slider>
  );
};
