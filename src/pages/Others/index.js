import React, { useState, useEffect } from 'react';
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    minHeight: 'calc(100vh - 100px)',
    marginTop: theme.spacing(6)
  },
  tabs: {
    justifyContent: 'space-around',
    borderBottom: '1px solid #ddd'
  }
}));

function Other() {
  let { id } = useParams();
  const [lists, setLists] = useState([]);
  const { setError } = AppCont.useContainer();
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useEffect(() => {
    async function getList() {
      const { result, error } = await requestApi('getCategoriesById', { id });
      if (error) {
        return setError(error);
      }
      console.log(result);
      setLists(result);
    }
    getList();
    return () => {
      setValue(0);
    };
  }, [id, setError]);

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
  return (
    <div className={classes.root}>
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
          <Tab key={sub.id} label={sub.name} {...a11yProps(idx)} />
        ))}
      </Tabs>

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
              <ItemList list={sub.news} />
            </TabPanel>
          ))}
        </SwipeableViews>
      </InfiniteScroll>
    </div>
  );
}

export default Other;
