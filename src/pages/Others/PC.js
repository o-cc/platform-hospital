import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwiperWrap from 'pages/components/Swiper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel.js';
import ItemList from 'pages/components/ListItem';
import { Divider, Typography } from '@material-ui/core';
import PCTemplate from '../components/PCTemplate/index.js';
const useStyles = makeStyles(theme => ({
  tabs: {
    color: '#000',

    '& .Mui-selected': {
      fontWeight: 'bold'
    },
    '& .MuiTabs-indicator': {
      width: '85%'
    }
  }
}));
function InPc(props) {
  const classes = useStyles();
  const {
    lists = [],
    a11yProps,
    swiperList,
    commendList,
    value,
    handleChange,
    loadMoreFun,
    NotMore
  } = props;

  return (
    <PCTemplate>
      {lists.length > 0 ? (
        <>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
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
          {lists.map((sub, idx) => (
            <TabPanel
              value={value}
              index={idx}
              next={sub.next}
              key={idx}
              style={{ padding: `0 20px` }}
            >
              <SwiperWrap
                swiperList={swiperList}
                commendList={commendList}
                height={280}
              />
              <ItemList list={sub.news} />
              {sub.next && (
                <Typography
                  onClick={loadMoreFun}
                  variant="body1"
                  align="center"
                  color="textSecondary"
                  style={{ marginTop: 8, cursor: 'pointer' }}
                >
                  点击加载更多
                </Typography>
              )}
            </TabPanel>
          ))}
        </>
      ) : (
        <NotMore />
      )}
    </PCTemplate>
  );
}
export default InPc;
