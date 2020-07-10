import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    background: '#fff',
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(0, 2),
    margin: '10px auto'
  },
  mainColumn: {
    width: '694px',
    flexShrink: 0,
    marginRight: '10px',
    marginBottom: 0
  },
  sideBar: {
    flex: '1 1',
    fontSize: '14px'
  }
}));
function InPc() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.mainColumn}></div>
      <div className={classes.sideBar}></div>
    </div>
  );
}
export default InPc;
