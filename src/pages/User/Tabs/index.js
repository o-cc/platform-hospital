import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Divider, Box } from '@material-ui/core';
import ItemList from 'pages/components/ListItem';
import { vw } from '@/utils';

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

export default function FullWidthTabs({ listItem, tabIdx, setValue, news }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.bar}>
        <Tabs
          value={tabIdx}
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

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIdx}
        onChangeIndex={index => handleChange(null, index)}
      >
        {new Array(3).fill('_').map((item, idx) => (
          <TabPanel value={tabIdx} index={idx} dir={theme.direction} key={idx}>
            <ItemList list={news.results} />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}
FullWidthTabs.defaultProps = {
  listItem: {
    list: []
  }
};
