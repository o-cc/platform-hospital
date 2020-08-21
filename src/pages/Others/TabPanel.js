import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { vw } from '@/utils';

export default function TabPanel(props) {
  const { children, value, index, next, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      style={{ minHeight: 'calc(83vh - 52px)' }}
      {...other}
    >
      {value === index && (
        <Box
          style={{
            padding: `${vw(7.5)} 0`,
            overflowY: 'hidden'
          }}
          p={3}
        >
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
