import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Divider, Box } from '@material-ui/core';
import ItemList from 'pages/components/ListItem';
import { vw, requestApi, getQueryKey } from '@/utils';
import InfiniteScroll from 'react-infinite-scroller';

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
      {value === index && (
        <Box style={{ padding: `0 ${vw(30)}`, overflowY: 'hidden' }} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  bar: {
    boxShadow: 'none'
  }
}));

function getTabType(type) {
  let temp;
  switch (type) {
    case 1:
      temp = 'GraphText';
      break;
    case 2:
      temp = 'Video';
      break;
    default:
      break;
  }

  return temp;
}

export default function FullWidthTabs({
  listItem,
  userId,
  setError,
  ...props
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [news, setNews] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getNews() {
      let { result: newsRes, error: newsErr } = await requestApi(
        'getAuthorNews',
        {
          author_id: userId,
          type: getTabType(value)
        }
      );
      if (newsErr) return setError(newsErr);
      setNews(newsRes);
    }
    getNews();
  }, [userId, setError, value]);

  const loadFunc = async () => {
    const page = getQueryKey('page', news.next);
    let { result, error } = await requestApi('getAuthorNews', {
      author_id: userId,
      type: getTabType(value),
      page
    });
    if (error) return setError(error);
    setNews(sta => {
      return {
        ...sta,
        ...result,
        results: sta.results.concat(result.results)
      }
    })
  };

  const hasMore = news.next;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          classes={{
            flexContainer: classes.tabs
          }}
          aria-label="full width tabs example"
        >
          <Tab label="全部" {...a11yProps(0)} />
          <Tab label="文章" {...a11yProps(1)} />
          <Tab label="视频" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Divider />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={!!hasMore}
        loader={
          <div style={{ textAlign: 'center' }} key={0}>
            正在加载...
          </div>
        }
      >
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={index => handleChange(null, index)}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ItemList list={news.results} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ItemList list={news.results} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ItemList list={news.results} />
          </TabPanel>
        </SwipeableViews>
      </InfiniteScroll>
    </div>
  );
}
FullWidthTabs.defaultProps = {
  listItem: {
    list: []
  }
};
