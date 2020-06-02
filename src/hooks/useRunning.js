import React from 'react';

export default fn => {
  const [running, setRunning] = React.useState(false);

  return async (...args) => {
    if (running) return;
    setRunning(true);
    await fn(...args);
    setRunning(false);
  };
};
