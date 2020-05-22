import React from 'react';
import { Grid, IconButton, makeStyles, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    fontSize: 18,
    background: '#fff'
  }
}));

export default withRouter(props => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.header}>
      <Grid container justify="space-between">
        <Grid item>
          <IconButton
            onClick={() => {
              if (props.back) return props.back();
              props.history.go && props.history.go(-1);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" style={{ height: '100%' }}>
            {props.title}
          </Grid>
        </Grid>
        <Grid item>
          <IconButton onClick={() => props.history && props.history.push('/')}>
            <HomeOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
});
