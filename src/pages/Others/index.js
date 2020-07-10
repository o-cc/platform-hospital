import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AppCont from 'container';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import ItemList from 'pages/components/ListItem';
import { vw, requestApi } from '@/utils';
import InfiniteScroll from 'react-infinite-scroller';
import qs from 'qs';
import SwiperWrap from 'pages/components/Swiper';
import useWidth from '@/hooks/useWidth';
import Hidden from '@material-ui/core/Hidden';
import PC from './PC';
import { Divider } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, next, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: `${vw(7.5)} 0`, overflowY: 'hidden' }} p={3}>
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    minHeight: 'calc(100vh - 108px)',
    marginTop: theme.spacing(6),
    maxWidth: '1200px',
    margin: 'auto'
  },
  tabs: {}
}));
function formatArray2Obj(contents) {
  return contents.reduce((prev, next) => {
    prev[next.key] = next;
    return prev;
  }, {});
}

function Other() {
  let { id } = useParams();
  const [lists, setLists] = useState([]);
  const { setError } = AppCont.useContainer();
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [adList, setAdList] = useState([]);

  useEffect(() => {
    async function getList() {
      const { result, error } = await requestApi('getCategoriesById', { id });
      if (error) {
        return setError(error);
      }
      console.log(result);
      setLists(result);
    }

    if (id) {
      getList();
    }

    return () => {
      setValue(0);
    };
  }, [id, setError]);

  const getCategoriesAdById = useCallback(
    async tabId => {
      if (!lists[tabId]) {
        return;
      }
      const id = lists[tabId].id;
      const { result, error } = await requestApi('getCategoriesAdById', { id });
      if (error) {
        return setError(error);
      }
      setAdList(result);
    },
    [setError, lists]
  );

  useEffect(() => {
    getCategoriesAdById(value);
  }, [getCategoriesAdById, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadFunc = async () => {
    if (!lists[value]) return;
    const id = lists[value].id;
    const next = lists[value].next || '';
    const page = qs.parse(next.slice(next.lastIndexOf('?') + 1)).page;
    let { result, error } = await requestApi('getCategoriesDetail', {
      id,
      page
    });
    if (error) {
      return setError(error);
    }
    //考虑是否加loading 限制竟态
    setLists(lists => {
      return lists.map(list => {
        if (list.id === id) {
          return {
            ...list,
            ...result,
            news: list.news.concat(result.results)
          };
        }
        return list;
      });
    });
  };

  const hasMore = lists[value] && lists[value].next;
  const { contents: swiperList = [] } =
    formatArray2Obj(adList)['zpgg-banner'] || {};
  const { contents: commendList = [] } =
    formatArray2Obj(adList)['zpgg-list'] || {};
  const width = useWidth();

  return (
    <div
      className={classes.root}
      style={{ marginTop: width === 'xs' ? undefined : '82px' }}
    >
      <Hidden smUp>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{
            flexContainer: classes.tabs
          }}
          aria-label="scrollable auto tabs"
        >
          {lists.map((sub, idx) => (
            <Tab
              size="small"
              key={sub.id}
              label={sub.name}
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
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
            onChangeIndex={idx => handleChange(undefined, idx)}
          >
            {lists.map((sub, idx) => (
              <TabPanel value={value} index={idx} next={sub.next} key={idx}>
                <SwiperWrap
                  swiperList={swiperList}
                  commendList={commendList}
                ></SwiperWrap>
                <ItemList list={sub.news} />
              </TabPanel>
            ))}
          </SwipeableViews>
        </InfiniteScroll>
      </Hidden>

      <Hidden xsDown>
        <PC />
      </Hidden>
    </div>
  );
}

export default Other;
