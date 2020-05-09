import React from 'react';

export default (initValue = '') => {
  const [value, setValue] = React.useState(initValue);
  const onChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange
  };
};
