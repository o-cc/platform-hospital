import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideInPC from 'pages/components/sideInPC';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '1000px',
    display: 'flex',
    alignItems: 'flex-start',
    margin: '10px auto'
  },
  mainColumn: {
    width: '694px',
    flexShrink: 0,
    marginRight: '10px',
    marginBottom: 0,
    background: '#fff'
  }
}));
export default props => {
  const classes = useStyles();
  return (
    <>
      {props.screen === 'xs' ? (
        props.children
      ) : (
        <div className={classes.root}>
          <div className={classes.mainColumn}>{props.children}</div>
          <SideInPC />
        </div>
      )}
    </>
  );
};
