import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import ItemList from 'pages/components/ListItem';
import { homeTestData } from '../../helper';
import { vw } from '@/utils';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // let { menuType } = useParams();
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
    marginTop: theme.spacing(6)
  },
  tabs: {
    justifyContent: 'space-around',
    borderBottom: '1px solid #ddd'
  }
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const handleChangeIndex = index => {
    setValue(index);
  };
  const { lists } = props;
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
          <Tab key={idx} label={sub.text} {...a11yProps(idx)} />
        ))}
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {lists.map((sub, idx) => (
          <TabPanel value={value} index={idx} key={idx}>
            <ItemList list={homeTestData[0].list} />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}

ScrollableTabsButtonAuto.defaultProps = {
  lists: []
};
