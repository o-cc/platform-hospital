import React from 'react';
import { Grid, makeStyles, IconButton, Divider } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from 'react-router-dom';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
const useStyles = makeStyles(theme => ({
  root: {},
  back: {},
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
}));
const TopNav = props => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        spacing={3}
        justify="space-between"
        className={classes.root}
      >
        <Grid item className={classes.back}>
          <IconButton onClick={() => props.history.go && props.history.go(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>

        <Grid item className={classes.title}>
          {props.title && props.title}
        </Grid>
        <Grid item className={classes.back}>
          <IconButton
            onClick={() => {
              console.log('点击更多');
            }}
          >
            <MoreHorizOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      {props.unDivider && <Divider />}
    </>
  );
};
export default withRouter(TopNav);
TopNav.defaultProps = {
  unDivider: true
};
