import React from 'react';
import { Grid, IconButton, makeStyles, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { vw } from '@/utils';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    lineHeight: vw(90),
    fontSize: vw(35),
    fontWeight: 'bold'
  }
}));

export default withRouter(props => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.header}>
      <Grid container justify="space-between">
        <Grid item>
          <IconButton onClick={() => props.history.go && props.history.go(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>{props.title}</Grid>
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
